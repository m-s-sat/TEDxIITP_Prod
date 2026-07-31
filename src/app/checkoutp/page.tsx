"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Checkoutp1 from "../../features/components/cart/Checkoutp1";
import Checkoutp2 from "../../features/components/cart/Checkoutp2";
import Checkoutp3 from "../../features/components/cart/Checkoutp3";

export default function CheckoutRoute() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);

  const nextStep = () => setStep((prev) => prev + 1);
  const prevStep = () => setStep((prev) => prev - 1);

  // Clear data and send home when transmission is initiated
  const handleComplete = () => {
    localStorage.clear();
    router.push("/");
  };

  // Dynamically switch views based on the step state value
  const renderStep = () => {
    switch (step) {
      case 1:
        return <Checkoutp1 onNext={nextStep} />;
      case 2:
        return <Checkoutp2 onNext={nextStep} onBack={prevStep} />;
      case 3:
        return <Checkoutp3 onBack={prevStep} onComplete={handleComplete} />;
      default:
        return <Checkoutp1 onNext={nextStep} />;
    }
  };

  return (
    <div className="min-h-screen text-white p-4">
   

      {renderStep()}
    </div>
  );
}