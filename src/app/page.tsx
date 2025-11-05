import Header from "@/components/Header";
import SubnetCalculator from "@/components/SubnetCalculator";

export default function HomePage() {
   return (
      <div className="min-h-screen bg-zinc-900">
         <Header />
         <main className="container mx-auto p-4 md:p-8">
            <SubnetCalculator />
         </main>
      </div>
   );
}
