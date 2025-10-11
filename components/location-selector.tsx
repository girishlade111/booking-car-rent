"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import type { BookingData } from "./car-rental-booking"

// Mock locations data
const locations = [
  { value: "new-york", label: "New York" },
  { value: "los-angeles", label: "Los Angeles" },
  { value: "chicago", label: "Chicago" },
  { value: "miami", label: "Miami" },
  { value: "san-francisco", label: "San Francisco" },
  { value: "las-vegas", label: "Las Vegas" },
  { value: "seattle", label: "Seattle" },
  { value: "boston", label: "Boston" },
]

interface LocationSelectorProps {
  bookingData: BookingData
  updateBookingData: (data: Partial<BookingData>) => void
}

export default function LocationSelector({ bookingData, updateBookingData }: LocationSelectorProps) {
  const [sameLocation, setSameLocation] = useState(true)

  useEffect(() => {
    if (sameLocation && bookingData.pickupLocation) {
      updateBookingData({ returnLocation: bookingData.pickupLocation })
    }
  }, [sameLocation, bookingData.pickupLocation, updateBookingData])

  const handleSameLocationChange = (checked: boolean) => {
    setSameLocation(checked)
    if (checked) {
      updateBookingData({ returnLocation: bookingData.pickupLocation })
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Select Pick-up & Return Locations</h2>
        <p className="text-muted-foreground mb-6">Choose your preferred pick-up and return locations</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup-location">Pick-up Location</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" className="w-full justify-between">
                {bookingData.pickupLocation
                  ? locations.find((location) => location.value === bookingData.pickupLocation)?.label
                  : "Select pick-up location"}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Search location..." />
                <CommandList>
                  <CommandEmpty>No location found.</CommandEmpty>
                  <CommandGroup>
                    {locations.map((location) => (
                      <CommandItem
                        key={location.value}
                        value={location.value}
                        onSelect={(currentValue) => {
                          const value = currentValue === bookingData.pickupLocation ? "" : currentValue
                          updateBookingData({ pickupLocation: value })
                          if (sameLocation) {
                            updateBookingData({ returnLocation: value })
                          }
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            bookingData.pickupLocation === location.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                        {location.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="same-location" checked={sameLocation} onCheckedChange={handleSameLocationChange} />
          <label
            htmlFor="same-location"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Return to the same location
          </label>
        </div>

        {!sameLocation && (
          <div className="space-y-2">
            <Label htmlFor="return-location">Return Location</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" className="w-full justify-between">
                  {bookingData.returnLocation
                    ? locations.find((location) => location.value === bookingData.returnLocation)?.label
                    : "Select return location"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search location..." />
                  <CommandList>
                    <CommandEmpty>No location found.</CommandEmpty>
                    <CommandGroup>
                      {locations.map((location) => (
                        <CommandItem
                          key={location.value}
                          value={location.value}
                          onSelect={(currentValue) => {
                            updateBookingData({
                              returnLocation: currentValue === bookingData.returnLocation ? "" : currentValue,
                            })
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              bookingData.returnLocation === location.value ? "opacity-100" : "opacity-0",
                            )}
                          />
                          {location.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
        )}
      </div>
    </div>
  )
}
