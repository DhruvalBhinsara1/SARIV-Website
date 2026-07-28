"use client";

import { Component, type ReactNode } from "react";

type Props = { children: ReactNode; label: string };
type State = { error: Error | null };

// So a bug in one dashboard section (bad data, a thrown render) can't blank
// the rest of the admin page — it swaps just that section for an inline message.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error(`Error in ${this.props.label}`, error);
  }

  render() {
    if (this.state.error) {
      return (
        <p className="text-error text-sm">
          {this.props.label} crashed: {this.state.error.message}
        </p>
      );
    }
    return this.props.children;
  }
}
