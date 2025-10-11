"use client"

import { cn } from "@/lib/utils"

import { useState, useEffect } from "react"
import type { Car } from "@/types/car"
import type { BookingData } from "./car-rental-booking"
import { Card, CardContent } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Badge } from "@/components/ui/badge"
import { Users, Fuel, Briefcase } from "lucide-react"
import Image from "next/image"

interface CarSelectorProps {
  bookingData: BookingData
  updateBookingData: (data: Partial<BookingData>) => void
}

// Mock API call to fetch cars
const fetchCars = async (): Promise<Car[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
    {
      id: "1",
      name: "Toyota Corolla",
      category: "Economy",
      image: "/placeholder.svg?height=120&width=240",
      pricePerDay: 45,
      seats: 5,
      transmission: "Automatic",
      fuelType: "Gasoline",
      luggage: 2,
    },
    {
      id: "2",
      name: "Honda Civic",
      category: "Compact",
      image: "/placeholder.svg?height=120&width=240",
      pricePerDay: 50,
      seats: 5,
      transmission: "Automatic",
      fuelType: "Gasoline",
      luggage: 2,
    },
    {
      id: "3",
      name: "Ford Escape",
      category: "SUV",
      image: "/placeholder.svg?height=120&width=240",
      pricePerDay: 65,
      seats: 5,
      transmission: "Automatic",
      fuelType: "Gasoline",
      luggage: 3,
    },
    {
      id: "4",
      name: "Mercedes C-Class",
      category: "Luxury",
      image: "/placeholder.svg?height=120&width=240",
      pricePerDay: 95,
      seats: 5,
      transmission: "Automatic",
      fuelType: "Gasoline",
      luggage: 2,
    },
  ]
}

export default function CarSelector({ bookingData, updateBookingData }: CarSelectorProps) {
  const [cars, setCars] = useState<Car[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadCars = async () => {
      try {
        const carsData = await fetchCars()
        setCars(carsData)
      } catch (error) {
        console.error("Failed to fetch cars:", error)
      } finally {
        setLoading(false)
      }
    }

    loadCars()
  }, [])

  const handleCarSelect = (carId: string) => {
    const selectedCar = cars.find((car) => car.id === carId) || null
    updateBookingData({ selectedCar })
  }

  const calculateTotalPrice = (car: Car) => {
    if (!bookingData.startDate || !bookingData.endDate) return 0

    const days = Math.ceil((bookingData.endDate.getTime() - bookingData.startDate.getTime()) / (1000 * 60 * 60 * 24))

    return car.pricePerDay * days
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-4">Select a Car</h2>
        <p className="text-muted-foreground mb-6">Choose from our available vehicles</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col md:flex-row">
                  <Skeleton className="h-40 w-full md:w-60" />
                  <div className="p-6 w-full">
                    <Skeleton className="h-6 w-40 mb-2" />
                    <Skeleton className="h-4 w-24 mb-4" />
                    <div className="flex gap-4 mb-4">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-6 w-32 mt-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <RadioGroup value={bookingData.selectedCar?.id} onValueChange={handleCarSelect} className="space-y-4">
          {cars.map((car) => (
            <div key={car.id} className="relative">
              <RadioGroupItem value={car.id} id={`car-${car.id}`} className="peer sr-only" />
              <Label htmlFor={`car-${car.id}`} className="block cursor-pointer">
                <Card
                  className={cn(
                    "overflow-hidden transition-all",
                    "peer-data-[state=checked]:ring-2 peer-data-[state=checked]:ring-primary",
                  )}
                >
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="relative h-40 md:w-60 bg-muted">
                        <Image src={car.image || "/placeholder.svg"} alt={car.name} fill className="object-cover" />
                        <Badge className="absolute top-2 left-2">{car.category}</Badge>
                      </div>
                      <div className="p-6 w-full">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-lg">{car.name}</h3>
                            <p className="text-sm text-muted-foreground">{car.transmission}</p>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold">${car.pricePerDay}</div>
                            <div className="text-sm text-muted-foreground">per day</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-4 mt-4">
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span className="text-sm">{car.seats} seats</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Fuel className="h-4 w-4" />
                            <span className="text-sm">{car.fuelType}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Briefcase className="h-4 w-4" />
                            <span className="text-sm">{car.luggage} luggage</span>
                          </div>
                        </div>

                        {bookingData.startDate && bookingData.endDate && (
                          <div className="mt-4 text-right">
                            <div className="font-semibold text-lg">${calculateTotalPrice(car)}</div>
                            <div className="text-sm text-muted-foreground">
                              total for{" "}
                              {Math.ceil(
                                (bookingData.endDate.getTime() - bookingData.startDate.getTime()) /
                                  (1000 * 60 * 60 * 24),
                              )}{" "}
                              days
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
    </div>
  )
}
