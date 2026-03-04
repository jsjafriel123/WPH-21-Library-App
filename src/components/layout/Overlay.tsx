type Props = {
  show: boolean;
  onClick: () => void;
};

export default function Overlay({ show, onClick }: Props) {
  if (!show) return null;

  return <div onClick={onClick} className='fixed inset-0 z-40 bg-black/60' />;
}
