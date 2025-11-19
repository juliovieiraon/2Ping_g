
import React from 'react';

export interface FeatureProps {
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
  isLoading?: boolean;
}

export interface ProductDemoProps {
    // Props placeholder if we make the component configurable from outside later
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  username: string;
  avatar_url?: string;
}

export interface Content {
  id?: string;
  user_id: string;
  title?: string;
  video_url: string;
  blur_level: number;
  cta_text: string;
  price: string;
  button_color: string;
  created_at?: string;
}

export type ViewType = 'home' | 'signup' | 'dashboard';
