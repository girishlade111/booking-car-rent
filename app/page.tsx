import CarRentalBooking from "@/components/car-rental-booking"

export default function Home() {
  return (
    <main className="min-h-screen p-4 md:p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Car Rental Service</h1>
        <CarRentalBooking />
      </div>
    </main>
  )
}
