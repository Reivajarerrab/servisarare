'use client';

import React from 'react';
import {
  Zap,
  Droplet,
  Hammer,
  Paintbrush,
  Key,
  Tv,
  Sparkles,
  Scissors,
  Wrench,
  Bug,
  Truck,
  Package,
  TreePine,
  Settings,
  Shield,
  Layers,
  HardHat,
  HelpCircle,
  LucideProps,
} from 'lucide-react';

interface IconHelperProps extends LucideProps {
  name: string;
}

export function CategoryIcon({ name, className = 'w-5 h-5', ...props }: IconHelperProps) {
  switch (name) {
    case 'Zap':
      return <Zap className={className} {...props} />;
    case 'Droplet':
      return <Droplet className={className} {...props} />;
    case 'Hammer':
      return <Hammer className={className} {...props} />;
    case 'Layers':
      return <Layers className={className} {...props} />;
    case 'HardHat':
      return <HardHat className={className} {...props} />;
    case 'Paintbrush':
      return <Paintbrush className={className} {...props} />;
    case 'Key':
      return <Key className={className} {...props} />;
    case 'Tv':
      return <Tv className={className} {...props} />;
    case 'Sparkles':
      return <Sparkles className={className} {...props} />;
    case 'Scissors':
      return <Scissors className={className} {...props} />;
    case 'Wrench':
      return <Wrench className={className} {...props} />;
    case 'Bug':
      return <Bug className={className} {...props} />;
    case 'Truck':
      return <Truck className={className} {...props} />;
    case 'Package':
      return <Package className={className} {...props} />;
    case 'TreePine':
      return <TreePine className={className} {...props} />;
    case 'Settings':
      return <Settings className={className} {...props} />;
    case 'Shield':
      return <Shield className={className} {...props} />;
    default:
      return <HelpCircle className={className} {...props} />;
  }
}
