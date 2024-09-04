"use client";

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaPlus } from "react-icons/fa";
import axios from "axios";
import { Employee } from "./types/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeSchema } from "./validator/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

export function DialogAddData({ refetch }: { refetch: any }) {
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>({
    mode: "onChange",
    resolver: zodResolver(employeeSchema),
  });

  const queryClient = useQueryClient();

  const addData = useMutation({
    mutationFn: async (data: Employee) => {
      try {
        const response = await axios.post("/api/employees", data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      refetch();
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="flex gap-3"
          onClick={() => setOpen(true)}
        >
          <FaPlus /> Add Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit((data) => addData.mutate(data))}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                First Name
              </Label>
              <Input
                id="firstname"
                {...register("firstName")}
                className="col-span-3"
              />
              {errors.firstName && (
                <p className="col-span-4 text-red-500 text-right text-sm">
                  {String(errors.firstName.message)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="lastname" className="text-right">
                Last Name
              </Label>
              <Input
                id="lastname"
                {...register("lastName")}
                className="col-span-3"
              />
              {errors.lastName && (
                <p className="col-span-4 text-red-500 text-right text-sm">
                  {String(errors.lastName.message)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="position" className="text-right">
                Position
              </Label>
              <Input
                id="position"
                {...register("position")}
                className="col-span-3"
              />
              {errors.position && (
                <p className="col-span-4 text-red-500 text-right text-sm">
                  {String(errors.position.message)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="phone" className="text-right">
                Phone
              </Label>
              <Input
                id="phone"
                type="text"
                {...register("phone")}
                className="col-span-3"
              />
              {errors.phone && (
                <p className="col-span-4 text-red-500 text-right text-sm">
                  {String(errors.phone.message)}
                </p>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                {...register("email")}
                className="col-span-3"
              />
              {errors.email && (
                <p className="col-span-4 text-red-500 text-right text-sm">
                  {String(errors.email.message)}
                </p>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
