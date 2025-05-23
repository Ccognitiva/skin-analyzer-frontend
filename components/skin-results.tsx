"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  RefreshCw,
  AlertTriangle,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { PredictionResponse } from "@/types";
import Link from "next/link";

interface SkinResultsProps {
  capturedImage: string;
  skinCondition: PredictionResponse;
  onReset: () => void;
}

export default function SkinResults({
  capturedImage,
  skinCondition,
  onReset,
}: SkinResultsProps) {
  const { predicted_condition, confidence, info } = skinCondition;
  const recommendedProducts = info?.recommended_products ?? [];

  return (
    <div className="space-y-6 pb-16">
      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg max-w-[500px]">
        <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0" />
        <div>
          <h4 className="font-semibold text-yellow-700">Disclaimer</h4>
          <p className="text-sm text-yellow-800">
            This analysis is for informational purposes and may not be 100%
            accurate. Skin conditions can be complex—please consult a qualified
            dermatologist for a professional evaluation.
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 md:gap-14">
        {/* Image Preview */}
        <div>
          <Card className="overflow-hidden">
            <img
              src={capturedImage || "/placeholder-image.jpg"}
              alt="Analyzed skin"
              className="w-full h-auto aspect-square object-cover"
            />
          </Card>
        </div>

        {/* Analysis Details */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center justify-between">
              <h3 className="text-3xl lg:text-5xl">Detected Condition</h3>
            </div>
            <Card className="bg-background/50 my-4 w-full">
              <CardContent className="pt-6">
                <div className="flex items-baseline justify-between">
                  <h4 className="text-xl font-semibold font-sans capitalize">
                    {predicted_condition}
                  </h4>
                  <span className="text-sm text-muted-foreground">
                    {(confidence * 100).toFixed(1)}%
                  </span>
                </div>
                {info?.description && (
                  <p className="mt-4 text-muted-foreground max-w-[50ch]">
                    {info.description}
                  </p>
                )}
              </CardContent>
            </Card>
            <a
              href="https://calendly.com/auroraorganic4u"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block"
            >
              <Button variant="default" className="w-full group mt-10 md:mt-14">
                Book Free Consultation{" "}
                <ChevronRight className="ml-3 group-hover:ml-5 duration-300" />
              </Button>
            </a>
            <Button variant="outline" asChild className="mt-8 w-full group">
              <Link href={"/analyze#products"}>
                View Recommended Products{" "}
                <ChevronDown className="ml-3 group-hover:ml-5 duration-300" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Recommended Products */}
      {recommendedProducts.length > 0 && (
        <div className="pt-16 md:pt-32" id="products">
          <h3 className="text-2xl  mb-8 md:mb-12">Recommended Products</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-10">
            {recommendedProducts.map((product) => (
              <a
                key={product.image}
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card className="overflow-hidden">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={product.image || "/placeholder-image.jpg"}
                      alt={product.title}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h4 className="font-medium line-clamp-1">
                      {product.title}
                    </h4>
                    <p className="text-sm text-muted-foreground line-clamp-2 mt-1">
                      {product.description}
                    </p>
                  </CardContent>
                </Card>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Reset Button */}
      <div className="flex justify-center mt-8">
        <Button onClick={onReset} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          New Analysis
        </Button>
      </div>
    </div>
  );
}
