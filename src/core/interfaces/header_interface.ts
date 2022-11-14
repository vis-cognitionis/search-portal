type HeaderStatus = "landing" | "result" | "addLink";

export interface HeaderStatusProps {
  status: HeaderStatus;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}
