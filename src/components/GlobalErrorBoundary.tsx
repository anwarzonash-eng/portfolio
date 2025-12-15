"use client";

import React from "react";

type ErrorBoundaryProps = {
  children: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: any;
  errorInfo: any;
};

export default class GlobalErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error("🔥 Global Error Caught:", error, errorInfo);
    this.setState({ error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-primary flex items-center justify-center p-6">
          <div className="max-w-xl bg-white shadow-lg p-6 rounded-lg border border-red-300">
            <h2 className="text-[2rem] font-bold text-red-600 mb-4">
              An unexpected error occurred
            </h2>

            <p className="font-semibold text-gray-700 text-[1.4rem] mb-2">Error Message:</p>
            <pre className="p-3 bg-gray-100 rounded text-sm overflow-auto">
              {String(this.state.error)}
            </pre>

            <div className="flex items-center justify-center">
            <button
              onClick={() => location.reload()}
              className="mt-6 px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 text-[1.4rem] font-medium"
            >
              Reload Page
            </button>
            </div>


          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
