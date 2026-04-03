// @ts-nocheck
import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  AreaChart as RechartsAreaChart,
  Area,
  PieChart as RechartsPieChart,
  Pie,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

interface ChartProps {
  data?: any[];
  children?: React.ReactNode;
  [key: string]: any;
}

export const LineChart: React.FC<ChartProps> = ({ data, children, ...props }) => (
  <RechartsLineChart data={data} {...props}>
    {children}
  </RechartsLineChart>
);

export const LineComponent: React.FC<ChartProps> = (props) => <Line {...props} />;

export const AreaChart: React.FC<ChartProps> = ({ data, children, ...props }) => (
  <RechartsAreaChart data={data} {...props}>
    {children}
  </RechartsAreaChart>
);

export const AreaComponent: React.FC<ChartProps> = (props) => <Area {...props} />;

export const PieChartComponent: React.FC<ChartProps> = ({ data, children, ...props }) => (
  <RechartsPieChart data={data} {...props}>
    {children}
  </RechartsPieChart>
);

export const PieComponent: React.FC<ChartProps> = (props) => <Pie {...props} />;

export const XAxisComponent: React.FC<ChartProps> = (props) => <RechartsXAxis {...props} />;

export const YAxisComponent: React.FC<ChartProps> = (props) => <RechartsYAxis {...props} />;

export const CartesianGridComponent: React.FC<ChartProps> = (props) => <CartesianGrid {...props} />;

export const TooltipComponent: React.FC<ChartProps> = (props) => <Tooltip {...props} />;

export const ResponsiveContainerComponent: React.FC<ChartProps> = ({ children, ...props }) => (
  <ResponsiveContainer {...props}>{children}</ResponsiveContainer>
);

export const CellComponent: React.FC<ChartProps> = (props) => <Cell {...props} />;
