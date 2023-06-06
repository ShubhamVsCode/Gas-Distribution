"use client";

import { DatePicker } from "@/components/ui/DatePicker";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { ToastProvider } from "@/components/ui/toast";
// import { useToast } from "@/components/ui/use-toast";

const GasId = ({ params }) => {
  const router = useRouter();

  const { gasId } = params;
  const [formData, setFormData] = useState({});
  const [date, setDate] = useState();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async () => {
    const {
      sellingDate,
      customerName,
      customerPhone,
      customerAddress,
      consumerNumber,
    } = formData;

    if (
      !sellingDate ||
      !customerName ||
      !customerPhone ||
      !customerAddress ||
      !consumerNumber
    ) {
      return console.log("All fields are required");
    }

    const res = await fetch("/api/gas/" + gasId, {
      method: "PUT",
      body: JSON.stringify({
        sellingDate,
        customerName,
        customerPhone,
        customerAddress,
        consumerNumber,
      }),
    });

    return router.replace("/");
  };

  useEffect(() => {
    const getGasData = async () => {
      const res = await fetch("/api/gas/" + gasId);
      const result = await res.json();
      console.log(result);
      setFormData({ ...result });
    };
    getGasData();
  }, []);

  const deleteGas = async () => {
    const res = await fetch("/api/gas/" + gasId, { method: "DELETE" });
    const result = await res.json();
    router.push("/");
    console.log(result);
  };

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit();
        }}
        className="space-y-4 px-52 py-5"
      >
        <div className="grid w-72 items-center gap-1.5">
          <Label htmlFor="gasSerialNumber">Gas Serial Number</Label>
          <Input
            className="w-72"
            type="text"
            id="gasSerialNumber"
            name="gasSerialNumber"
            placeholder=""
            value={formData?.gasSerialNumber}
            onChange={handleChange}
            disabled={true}
          />
        </div>
        <div className="grid w-72 items-center gap-1.5">
          <Label htmlFor="sellingDate">Gas Selling Date</Label>
          <DatePicker
            mode="single"
            className="w-72"
            date={date}
            setDate={(newDate) => {
              setDate(newDate);
              setFormData((prev) => ({ ...prev, sellingDate: newDate }));
            }}
          />
        </div>
        <div className="grid w-72 items-center gap-1.5">
          <Label htmlFor="consumerNumber">Consumer Number</Label>
          <Input
            id="consumerNumber"
            name="consumerNumber"
            onChange={handleChange}
            value={formData?.consumerNumber}
          />
        </div>
        <div className="grid w-72 items-center gap-1.5">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            name="customerName"
            onChange={handleChange}
            value={formData?.customerName}
          />
        </div>
        <div className="grid w-72 items-center gap-1.5">
          <Label htmlFor="customerPhone">Customer Phone</Label>
          <Input
            id="customerPhone"
            name="customerPhone"
            onChange={handleChange}
            maxLength={10}
            value={formData?.customerPhone}
          />
        </div>
        <div className="grid w-72 items-center gap-1.5">
          <Label htmlFor="customerAddress">Customer Address</Label>
          <Input
            id="customerAddress"
            name="customerAddress"
            onChange={handleChange}
            value={formData?.customerAddress}
          />
        </div>
        <div className="flex w-72 gap-5">
          {/* <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-500 rounded-full hover:bg-red-600">
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogHeader>Are you sure?</DialogHeader>
          </Dialog> */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-red-500 rounded-full hover:bg-red-600">
                <Trash2 />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure to{" "}
                  <span className="text-red-500 font-semibold">DELETE</span>?
                </DialogTitle>
              </DialogHeader>
              <DialogFooter className="">
                <Button
                  onClick={deleteGas}
                  className="bg-red-500 hover:bg-red-600"
                >
                  DELETE
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button type="submit" className="flex-1">
            Sell
          </Button>
        </div>
        {/* <code>{JSON.stringify(formData)}</code> */}
      </form>
    </>
  );
};

export default GasId;
