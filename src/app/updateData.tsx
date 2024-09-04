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
import { FaEdit, FaPlus, FaSpinner } from "react-icons/fa";
import axios from "axios";
import { Employee } from "./types/types";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { employeeSchema } from "./validator/validator";

export function DialogUpdateData({ dataId }: { dataId: string }) {
  const [open, setOpen] = useState(false);
  const [dataEmployee, setDataEmployee] = useState<Employee | null>(null);
  const [loading, setLoading] = useState(false);

  async function getEmployee() {
    try {
      const response = await axios.get(`/api/employees/${dataId}`);
      setDataEmployee(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getEmployee();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Employee>({
    mode: "onChange",
    resolver: zodResolver(employeeSchema),
  });

  const queryClient = useQueryClient();

  const updateData = useMutation({
    mutationFn: async (data: Employee) => {
      setLoading(true);
      try {
        const id = dataId;
        const response = await axios.patch(`/api/employees/${id}`, data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["employees"] });
      setOpen(false);
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex gap-3" onClick={() => setOpen(true)}>
          <FaEdit className="text-xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Employee</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit((data) => updateData.mutate(data))}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="firstname" className="text-right">
                First Name
              </Label>
              <Input
                id="firstname"
                defaultValue={dataEmployee?.firstName}
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
                defaultValue={dataEmployee?.lastName}
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
                defaultValue={dataEmployee?.position}
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
                defaultValue={dataEmployee?.phone}
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
                defaultValue={dataEmployee?.email}
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
            <Button type="submit" disabled={loading}>
              {loading ? <FaSpinner className="animate-spin" /> : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
