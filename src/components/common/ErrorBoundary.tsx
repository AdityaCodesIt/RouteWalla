import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';
import { Button } from './Button';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('RouteWala uncaught runtime error:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleResetCache = () => {
    try {
      localStorage.removeItem('routewala_v1_state_stops');
      localStorage.removeItem('routewala_v1_state_wishlist');
      localStorage.removeItem('routewala_v1_state_active_idx');
    } catch {}
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#F4F1EA] flex items-center justify-center p-4">
          <div className="ticket-stub p-6 sm:p-8 max-w-lg w-full bg-white border-2 border-[#0E0E0E] shadow-hard text-center">
            <div className="w-14 h-14 mx-auto mb-4 bg-[#D7372B] text-white border-2 border-[#0E0E0E] rounded-[4px] flex items-center justify-center shadow-hard-sm">
              <AlertTriangle className="w-8 h-8 stroke-[2.5]" />
            </div>

            <div className="font-mono text-xs font-bold text-[#D7372B] uppercase tracking-widest mb-1">
              TRANSIT RUNTIME EXCEPTION
            </div>

            <h1 className="font-display font-extrabold text-2xl text-[#0E0E0E] mb-2">
              Route Engine Interrupted
            </h1>

            <p className="font-body text-sm text-[#0E0E0E]/80 mb-6">
              A temporary display error occurred while rendering the page. Your saved delivery stops and COD counts remain safely stored in local memory.
            </p>

            {this.state.error && (
              <div className="p-3 mb-6 bg-[#15171A] text-[#F6B800] border-2 border-[#0E0E0E] rounded-[4px] font-mono text-xs text-left overflow-x-auto max-h-28">
                <code>{this.state.error.message || String(this.state.error)}</code>
              </div>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="touch"
                onClick={this.handleReload}
                icon={<RotateCcw className="w-5 h-5 stroke-[2.5]" />}
                className="w-full sm:w-auto"
              >
                Reload Page
              </Button>
              <Button
                variant="secondary"
                size="touch"
                onClick={this.handleResetCache}
                icon={<RotateCcw className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Reset Stored Cache
              </Button>
              <Button
                variant="ghost"
                size="touch"
                onClick={this.handleGoHome}
                icon={<Home className="w-5 h-5" />}
                className="w-full sm:w-auto"
              >
                Home
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
