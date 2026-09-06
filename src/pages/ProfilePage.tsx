import {
  User as UserIcon,
  Package,
  PiggyBank,
  Users,
  HelpCircle,
  Shield,
  FileText,
  ChevronRight,
} from 'lucide-react';

const QUICK_ACTIONS = [
  { icon: UserIcon, title: 'Profile details', subtitle: 'Name, contact and KYC info' },
  { icon: Package, title: 'Purchases', subtitle: 'Orders, invoices and loan status' },
  { icon: PiggyBank, title: 'Pledge history', subtitle: 'Funds you pledged or released' },
  { icon: Users, title: 'Invite friends', subtitle: 'Share the app, earn rewards' },
  { icon: HelpCircle, title: 'Support & FAQs', subtitle: 'Find answers or contact us' },
  { icon: Shield, title: 'Privacy policy', subtitle: 'How we handle your data' },
  { icon: FileText, title: 'Terms & conditions', subtitle: 'Rules governing your use' },
];

export function ProfilePage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-xl font-bold text-brand-ink">Profile</h1>
        <p className="text-sm text-brand-muted">Manage your account settings</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-brand-purple-light flex items-center justify-center text-brand-purple font-bold">
          U
        </div>
        <div>
          <p className="text-sm font-semibold text-brand-ink">User</p>
          <p className="text-xs text-brand-muted">+91 9131314683</p>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {QUICK_ACTIONS.map(({ icon: Icon, title, subtitle }) => (
          <div
            key={title}
            className="bg-white rounded-2xl p-3.5 flex items-center gap-3"
          >
            <div className="w-9 h-9 rounded-full bg-brand-purple-light flex items-center justify-center shrink-0">
              <Icon size={16} className="text-brand-purple" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-brand-ink">{title}</p>
              <p className="text-xs text-brand-muted">{subtitle}</p>
            </div>
            <ChevronRight size={16} className="text-brand-muted" />
          </div>
        ))}
      </div>
    </div>
  );
}
