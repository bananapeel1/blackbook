import { RequestFormProvider } from '@/lib/request-context';

export default function RequestLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequestFormProvider>{children}</RequestFormProvider>;
}
