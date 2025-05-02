'use client';

import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';

export function AddCadre() {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <PlusIcon />
          Add Cadre
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-full">
        <div className="mx-auto w-full max-w-xl">
          <DrawerHeader className="pb-8">
            <DrawerTitle>Add New Cadre</DrawerTitle>
            <DrawerDescription>
              Fill in the details to add a new cadre member.
            </DrawerDescription>
          </DrawerHeader>
          <div className="overflow-y-auto max-h-[calc(100vh-200px)] px-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input id="fullName" placeholder="Enter full name" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    type="number"
                    placeholder="Enter age"
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter phone number"
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="rt">RT</Label>
                  <Input id="rt" placeholder="Enter RT number" required />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rw">RW</Label>
                  <Input id="rw" placeholder="Enter RW number" required />
                </div>
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="nik">NIK</Label>
                <Input id="nik" placeholder="Enter NIK" required />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="Enter address" required />
              </div>
              <div className="flex justify-end space-x-2 pt-3">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Cadre</Button>
              </div>
            </form>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
