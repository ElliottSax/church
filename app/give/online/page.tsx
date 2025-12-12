"use client";

import { useState } from "react";
import { CreditCard, DollarSign, Calendar, Heart, CheckCircle } from "lucide-react";

export default function OnlineGivingPage() {
  const [amount, setAmount] = useState("");
  const [frequency, setFrequency] = useState<"once" | "weekly" | "monthly">("once");
  const [designation, setDesignation] = useState("general");

  const presetAmounts = [25, 50, 100, 250, 500];

  return (
    <div className="w-full">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Online Giving</h1>
            <p className="text-xl text-primary-100">
              Your generosity helps us share Christ&apos;s love and serve our community
            </p>
          </div>
        </div>
      </section>

      {/* Giving Form */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h2 className="text-2xl font-bold text-secondary-900 mb-6">
                Make a Donation
              </h2>

              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Amount
                </label>
                <div className="grid grid-cols-3 gap-3 mb-3">
                  {presetAmounts.map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setAmount(preset.toString())}
                      className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                        amount === preset.toString()
                          ? "bg-primary-600 text-white"
                          : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
                      }`}
                    >
                      ${preset}
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <DollarSign
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-secondary-400"
                    size={20}
                  />
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Other amount"
                    className="w-full pl-10 pr-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Frequency */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Frequency
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: "once", label: "One-time" },
                    { value: "weekly", label: "Weekly" },
                    { value: "monthly", label: "Monthly" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFrequency(option.value as any)}
                      className={`px-4 py-3 rounded-lg font-semibold transition-colors ${
                        frequency === option.value
                          ? "bg-primary-600 text-white"
                          : "bg-secondary-100 text-secondary-700 hover:bg-secondary-200"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Designation */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Designation
                </label>
                <select
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="general">General Fund</option>
                  <option value="missions">Mission Projects</option>
                  <option value="building">Building Fund</option>
                  <option value="youth">Youth Ministry</option>
                  <option value="outreach">Community Outreach</option>
                  <option value="other">Other (specify in notes)</option>
                </select>
              </div>

              {/* Notes */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-secondary-700 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  rows={3}
                  placeholder="Any special instructions or dedication..."
                  className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                ></textarea>
              </div>

              {/* Submit Button */}
              <button
                disabled={!amount}
                className="w-full bg-primary-600 text-white py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-secondary-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <CreditCard size={20} />
                <span>Continue to Payment</span>
              </button>

              <p className="text-xs text-secondary-500 text-center mt-4">
                Secure payment processing powered by Stripe. Your information is safe and
                encrypted.
              </p>
            </div>

            {/* Tax Deductible Notice */}
            <div className="mt-6 bg-primary-50 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <CheckCircle className="text-primary-600 flex-shrink-0 mt-1" size={20} />
                <div>
                  <h3 className="font-semibold text-secondary-900 mb-1">
                    Tax Deductible
                  </h3>
                  <p className="text-sm text-secondary-700">
                    Minneapolis Community of Christ is a 501(c)(3) organization. Your
                    donation is tax-deductible to the extent allowed by law. You'll
                    receive a receipt via email for your records.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-12 text-center">
              Your Giving Makes a Difference
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <Heart className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">200+</h3>
                <p className="text-secondary-600">Families served through outreach</p>
              </div>
              <div className="text-center">
                <Calendar className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">52</h3>
                <p className="text-secondary-600">Weekly worship services supported</p>
              </div>
              <div className="text-center">
                <DollarSign className="text-primary-600 mx-auto mb-4" size={48} />
                <h3 className="text-2xl font-bold text-secondary-900 mb-2">12</h3>
                <p className="text-secondary-600">Active mission projects funded</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Ways to Give */}
      <section className="py-16 bg-secondary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-secondary-900 mb-8 text-center">
              Other Ways to Give
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-semibold text-secondary-900 text-lg mb-2">
                  Mail a Check
                </h3>
                <p className="text-secondary-600 text-sm mb-3">
                  Make checks payable to "Minneapolis Community of Christ" and mail to:
                </p>
                <p className="text-secondary-700 text-sm">
                  123 Main Street<br />
                  Minneapolis, MN 55401
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-semibold text-secondary-900 text-lg mb-2">
                  In-Person
                </h3>
                <p className="text-secondary-600 text-sm">
                  Offering plates are available during Sunday worship services. You can
                  give via cash, check, or using our mobile giving option.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-semibold text-secondary-900 text-lg mb-2">
                  Stock or Securities
                </h3>
                <p className="text-secondary-600 text-sm">
                  Contact our Financial Officer at (612) 555-1234 for information about
                  donating stocks, bonds, or other securities.
                </p>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="font-semibold text-secondary-900 text-lg mb-2">
                  Planned Giving
                </h3>
                <p className="text-secondary-600 text-sm">
                  Consider including our congregation in your estate planning. Contact us
                  to learn about legacy giving options and bequests.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Questions */}
      <section className="py-16 bg-primary-50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-secondary-900 mb-4">
              Questions About Giving?
            </h2>
            <p className="text-secondary-700 mb-6">
              We're here to help! Contact our Financial Officer or pastoral team with any
              questions about giving, donations, or financial stewardship.
            </p>
            <a
              href="mailto:giving@minneapoliscofchrist.org"
              className="inline-block px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
