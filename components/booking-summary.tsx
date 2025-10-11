import { format } from "date-fns"
import type { BookingData } from "./car-rental-booking"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, CarIcon } from "lucide-react"
import Image from "next/image"

interface BookingSummaryProps {
  bookingData: BookingData
}

export default function BookingSummary({ bookingData }: BookingSummaryProps) {
  const { pickupLocation, returnLocation, startDate, endDate, selectedCar } = bookingData

  // Mock locations data for display purposes
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

  const getLocationLabel = (value: string) => {
    return locations.find((loc) => loc.value === value)?.label || value
  }

  const calculateTotalPrice = () => {
    if (!selectedCar || !startDate || !endDate) return 0

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))

    return selectedCar.pricePerDay * days
  }

  const calculateDays = () => {
    if (!startDate || !endDate) return 0

    return Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="space-y-6">
      {/* Locations */}
      {pickupLocation && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-medium">Locations</h3>
          </div>
          <div className="grid gap-2">
            <div>
              <div className="text-sm text-muted-foreground">Pick-up</div>
              <div>{getLocationLabel(pickupLocation)}</div>
            </div>
            {returnLocation && pickupLocation !== returnLocation && (
              <div>
                <div className="text-sm text-muted-foreground">Return</div>
                <div>{getLocationLabel(returnLocation)}</div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Dates */}
      {startDate && endDate && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-medium">Dates</h3>
          </div>
          <div className="grid gap-2">
            <div>
              <div className="text-sm text-muted-foreground">Pick-up</div>
              <div>{format(startDate, "EEE, MMM d, yyyy")}</div>
            </div>
            <div>
              <div className="text-sm text-muted-foreground">Return</div>
              <div>{format(endDate, "EEE, MMM d, yyyy")}</div>
            </div>
            <div className="mt-1">
              <Badge variant="outline">{calculateDays()} days</Badge>
            </div>
          </div>
        </div>
      )}

      {/* Selected Car */}
      {selectedCar && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <CarIcon className="h-5 w-5 text-muted-foreground" />
            <h3 className="font-medium">Vehicle</h3>
          </div>
          <div className="flex gap-4 items-center">
            <div className="relative h-16 w-24 bg-muted rounded">
              <Image
                src={selectedCar.image || "/placeholder.svg"}
                alt={selectedCar.name}
                fill
                className="object-cover rounded"
              />
            </div>
            <div>
              <div className="font-medium">{selectedCar.name}</div>
              <div className="text-sm text-muted-foreground">{selectedCar.category}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <div className="text-muted-foreground">Seats</div>
              <div>{selectedCar.seats}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Transmission</div>
              <div>{selectedCar.transmission}</div>
            </div>
            <div>
              <div className="text-muted-foreground">Fuel</div>
              <div>{selectedCar.fuelType}</div>
            </div>
          </div>
        </div>
      )}

      {/* Price Summary */}
      {selectedCar && startDate && endDate && (
        <>
          <Separator />
          <div className="space-y-2">
            <div className="flex justify-between">
              <div className="text-muted-foreground">Daily rate</div>
              <div>${selectedCar.pricePerDay}/day</div>
            </div>
            <div className="flex justify-between">
              <div className="text-muted-foreground">Rental period</div>
              <div>{calculateDays()} days</div>
            </div>
            <Separator className="my-2" />
            <div className="flex justify-between font-medium">
              <div>Total</div>
              <div>${calculateTotalPrice()}</div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
