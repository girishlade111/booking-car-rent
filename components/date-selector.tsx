"use client"

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import type { BookingData } from "./car-rental-booking"

interface DateSelectorProps {
  bookingData: BookingData
  updateBookingData: (data: Partial<BookingData>) => void
}

export default function DateSelector({ bookingData, updateBookingData }: DateSelectorProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean>(false)
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined
    to: Date | undefined
  }>({
    from: bookingData.startDate,
    to: bookingData.endDate,
  })

  useEffect(() => {
    if (dateRange.from) {
      updateBookingData({ startDate: dateRange.from })
    }
    if (dateRange.to) {
      updateBookingData({ endDate: dateRange.to })
    }
  }, [dateRange, updateBookingData])

  const today = new Date()
  const disabledDays = { before: today }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Select Rental Dates</h2>
        <p className="text-muted-foreground mb-6">Choose your pick-up and return dates</p>
      </div>

      <div className="grid gap-4">
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn("w-full justify-start text-left font-normal", !dateRange.from && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                  </>
                ) : (
                  format(dateRange.from, "PPP")
                )
              ) : (
                "Select dates"
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={(range) => {
                setDateRange(range)
                if (range.to) {
                  setIsCalendarOpen(false)
                }
              }}
              numberOfMonths={2}
              disabled={disabledDays}
            />
          </PopoverContent>
        </Popover>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="text-sm font-medium">Pick-up Date</div>
            <div className="p-2 border rounded-md">
              {bookingData.startDate ? format(bookingData.startDate, "EEEE, MMMM d, yyyy") : "Not selected"}
            </div>
          </div>
          <div className="space-y-2">
            <div className="text-sm font-medium">Return Date</div>
            <div className="p-2 border rounded-md">
              {bookingData.endDate ? format(bookingData.endDate, "EEEE, MMMM d, yyyy") : "Not selected"}
            </div>
          </div>
        </div>

        {bookingData.startDate && bookingData.endDate && (
          <div className="p-4 bg-muted rounded-md">
            <p className="text-sm">
              <span className="font-medium">Rental Duration:</span>{" "}
              {Math.ceil((bookingData.endDate.getTime() - bookingData.startDate.getTime()) / (1000 * 60 * 60 * 24))}{" "}
              days
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
