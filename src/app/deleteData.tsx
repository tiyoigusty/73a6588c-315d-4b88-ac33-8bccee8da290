"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { MdDeleteForever } from "react-icons/md";

export function DialogDeleteData({ id }: { id: string }) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const deleteData = useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await axios.delete(`/api/employees/${id}`);
        console.log(response.data);
      } catch (error) {
        console.error(error);
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
          <MdDeleteForever className="text-xl" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Data</DialogTitle>
        </DialogHeader>

        <h2>
          Are you sure you want to delete this item?
          <br />
          This action cannot be undone.
        </h2>
        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button className="bg-red-700" onClick={() => deleteData.mutate(id)}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
