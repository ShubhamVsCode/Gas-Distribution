"use client";

import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { DatePicker } from "@/components/ui/DatePicker";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { ToastProvider } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export default function Home() {
  const [date, setDate] = useState(new Date(Date.now()));
  const [serialNumber, setSerialNumber] = useState("");

  const [allGas, setAllGas] = useState([]);
  const [soldGas, setSoldGas] = useState([]);
  const [allSoldGasCount, setAllSoldGasCount] = useState(0);
  const { toast } = useToast();

  const onSubmit = async () => {
    if (!serialNumber) {
      return toast({
        title: "Please enter a serial number",
      });
    }

    const res = await fetch("/api/gas", {
      method: "POST",
      body: JSON.stringify({
        gasSerialNumber: serialNumber,
        receivingDate: date,
      }),
    });
    getAllGas();

    const result = await res.json();
    if (result) {
      setSerialNumber("");
    }
  };

  const getAllGas = async () => {
    const res = await fetch("/api/gas");
    setAllGas(await res.json());
  };

  const getAllSoldGasCount = async () => {
    const res = await fetch("/api/gas/sold/count");
    setAllSoldGasCount(await res.json());
  };

  const getSoldGas = async () => {
    const res = await fetch("/api/gas/sold");
    setSoldGas(await res.json());
  };

  useEffect(() => {
    getAllGas();
    getAllSoldGasCount();
    getSoldGas();
  }, []);

  return (
    <main>
      <div className="grid grid-cols-3 gap-10 px-52 py-5">
        <section className="max-w-2xl">
          <h1 className="mb-5 text-3xl font-bold">Add Gas</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-4"
          >
            <div className="grid w-72 items-center gap-1.5">
              <Label htmlFor="serial">Gas Serial Number</Label>
              <Input
                className="w-72"
                type="text"
                id="serial"
                placeholder=""
                value={serialNumber}
                onChange={(e) => setSerialNumber(e.target.value)}
              />
            </div>
            <div className="grid w-72 items-center gap-1.5">
              <Label htmlFor="receivingDate">Gas Receiving Date</Label>
              <DatePicker className="w-72" date={date} setDate={setDate} />
            </div>
            <Button>Add New Gas</Button>
          </form>
        </section>
      </div>
      <hr />

      <h1 className="px-52 mb-5 mt-5 text-3xl font-bold">
        Gas in Stock ({allGas?.length})
      </h1>
      <section className="grid px-52 gap-4 grid-cols-4 pb-5">
        {allGas?.length > 0 ? (
          allGas?.map((gas) => {
            return (
              <Link href={gas?._id} key={gas?._id}>
                <Card className="text-center bg-rose-50 border border-black/20 hover:shadow-lg duration-300">
                  <CardDescription>
                    <Image
                      src={"/indane-gas-logo.png"}
                      width="100"
                      height="10"
                      className="mx-auto mt-5"
                    />
                  </CardDescription>
                  <CardHeader className="text-2xl font-semibold">
                    {gas?.gasSerialNumber}
                  </CardHeader>
                </Card>
              </Link>
            );
          })
        ) : (
          <h1 className="text-xl">No gas in Stock...</h1>
        )}
      </section>

      <hr />
      <section className="w-full py-5 col-span-2 px-52">
        <h1 className="mb-5 text-3xl font-bold">
          Gas Sold ({allSoldGasCount})
        </h1>
        <div className="grid grid-cols-4 gap-4">
          {soldGas?.length > 0 &&
            soldGas
              ?.map((gas) => (
                <Card key={gas._id}>
                  <CardHeader className="font-bold text-lg">
                    {gas?.customerName}
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      <p className="font-semibold">
                        Sold Date:{" "}
                        {new Date(gas?.sellingDate).toLocaleDateString()}
                      </p>
                      <p className="font-semibold">
                        Consumer: {gas?.consumerNumber}
                      </p>
                      <p className="font-semibold">
                        Phone: {gas?.customerPhone}
                      </p>
                      <p className="font-semibold">
                        Address: {gas?.customerAddress}
                      </p>
                    </CardDescription>
                  </CardContent>
                </Card>
              ))
              .reverse()}
        </div>
      </section>
    </main>
  );
}
