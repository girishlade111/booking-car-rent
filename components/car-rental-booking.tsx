"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LocationSelector from "./location-selector"
import DateSelector from "./date-selector"
import CarSelector from "./car-selector"
import BookingSummary from "./booking-summary"
import { Button } from "@/components/ui/button"
import type { Car } from "@/types/car"

export type BookingData = {
  pickupLocation: string
  returnLocation: string
  startDate: Date | undefined
  endDate: Date | undefined
  selectedCar: Car | null
}

export default function CarRentalBooking() {
  const [activeTab, setActiveTab] = useState("location")
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupLocation: "",
    returnLocation: "",
    startDate: undefined,
    endDate: undefined,
    selectedCar: null,
  })

  const updateBookingData = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const handleNext = () => {
    if (activeTab === "location") setActiveTab("date")
    else if (activeTab === "date") setActiveTab("car")
    else if (activeTab === "car") setActiveTab("summary")
  }

  const handleBack = () => {
    if (activeTab === "date") setActiveTab("location")
    else if (activeTab === "car") setActiveTab("date")
    else if (activeTab === "summary") setActiveTab("car")
  }

  const isNextDisabled = () => {
    if (activeTab === "location") {
      return !bookingData.pickupLocation || !bookingData.returnLocation
    }
    if (activeTab === "date") {
      return !bookingData.startDate || !bookingData.endDate
    }
    if (activeTab === "car") {
      return !bookingData.selectedCar
    }
    return false
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <Card>
          <CardContent className="p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-4 mb-6">
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="date">Dates</TabsTrigger>
                <TabsTrigger value="car">Car</TabsTrigger>
                <TabsTrigger value="summary">Summary</TabsTrigger>
              </TabsList>

              <TabsContent value="location">
                <LocationSelector bookingData={bookingData} updateBookingData={updateBookingData} />
              </TabsContent>

              <TabsContent value="date">
                <DateSelector bookingData={bookingData} updateBookingData={updateBookingData} />
              </TabsContent>

              <TabsContent value="car">
                <CarSelector bookingData={bookingData} updateBookingData={updateBookingData} />
              </TabsContent>

              <TabsContent value="summary">
                <BookingSummary bookingData={bookingData} />
              </TabsContent>
            </Tabs>

            <div className="flex justify-between mt-6">
              {activeTab !== "location" && (
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              )}
              {activeTab !== "summary" ? (
                <Button onClick={handleNext} disabled={isNextDisabled()} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button className="ml-auto">Confirm Booking</Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold mb-4">Booking Summary</h2>
            <BookingSummary bookingData={bookingData} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
