import React from 'react';
import { motion } from 'framer-motion';
import ApperIcon from '@/components/ApperIcon';
import Badge from '@/components/atoms/Badge';

const StatusIndicator = ({ status, className = '' }) => {
  const getStatusConfig = (status) => {
    switch (status) {
      case 'pending':
        return {
          icon: 'Clock',
          label: 'Pending',
          variant: 'pending'
        };
      case 'uploading':
        return {
          icon: 'Upload',
          label: 'Uploading',
          variant: 'uploading'
        };
      case 'complete':
        return {
          icon: 'CheckCircle',
          label: 'Complete',
          variant: 'complete'
        };
      case 'error':
        return {
          icon: 'XCircle',
          label: 'Failed',
          variant: 'error'
        };
      default:
        return {
          icon: 'Circle',
          label: 'Unknown',
          variant: 'default'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      <Badge variant={config.variant} className="inline-flex items-center gap-1">
        <ApperIcon name={config.icon} size={12} />
        {config.label}
      </Badge>
    </motion.div>
  );
};

export default StatusIndicator;