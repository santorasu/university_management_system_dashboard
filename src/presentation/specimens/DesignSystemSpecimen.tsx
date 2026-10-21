import React, { useState } from 'react';
import { BrandLogo } from '../widgets/BrandLogo/BrandLogo';
import { Button } from '../widgets/Button/Button';
import { Input } from '../widgets/Input/Input';
import { Checkbox } from '../widgets/Checkbox/Checkbox';
import { Radio } from '../widgets/Radio/Radio';
import { Badge } from '../widgets/Badge/Badge';
import { Card, SchoolContextCard } from '../widgets/Card/Card';
import { Alert } from '../widgets/Alert/Alert';
import { ValidationMessage } from '../widgets/ValidationMessage/ValidationMessage';
import { OTPInput } from '../widgets/OTPInput/OTPInput';
import { StepProgress } from '../widgets/StepProgress/StepProgress';
import { PasswordChecklist } from '../widgets/PasswordChecklist/PasswordChecklist';
import { Tabs } from '../widgets/Tabs/Tabs';
import { Tooltip } from '../widgets/Tooltip/Tooltip';
import { Pagination } from '../widgets/Pagination/Pagination';
import { Table } from '../widgets/Table/Table';
import { Dialog } from '../widgets/Dialog/Dialog';
import './DesignSystemSpecimen.css';

export const DesignSystemSpecimen: React.FC = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(false);
  const [radioVal, setRadioVal] = useState('admin');
  const [otpVal, setOtpVal] = useState('248160');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [passwordInput, setPasswordInput] = useState('MapleDemo24!');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const sampleTableData = [
    { id: '1', name: 'Eleanor Vance', email: 'e.vance@maplegrove.edu', role: 'Super Admin', status: 'Active' },
    { id: '2', name: 'Marcus Bell', email: 'm.bell@maplegrove.edu', role: 'School Admin', status: 'Active' },
    { id: '3', name: 'Clara Oswald', email: 'c.oswald@maplegrove.edu', role: 'Teacher', status: 'Pending' },
  ];

  const tableColumns = [
    { key: 'name', header: 'Admin Name' },
    { key: 'email', header: 'Email Address' },
    {
      key: 'role',
      header: 'Role',
      render: (row: any) => (
        <Badge variant={row.role === 'Super Admin' ? 'info' : 'neutral'}>
          {row.role}
        </Badge>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (row: any) => (
        <Badge variant={row.status === 'Active' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="edusync-specimen">
      <header className="edusync-specimen__header">
        <div className="edusync-specimen__header-content">
          <BrandLogo variant="on-light" size="md" />
          <div className="edusync-specimen__header-text">
            <h1 className="edusync-specimen__title">Authoritative Custom Widgets Catalog</h1>
            <p className="edusync-specimen__subtitle">
              Figma Brand & Design System (Node 0:1) Component Specimen. Fully tokenized and reusable across EduSync.
            </p>
          </div>
        </div>
      </header>

      <div className="edusync-specimen__content">
        {/* SECTION 1: BRAND IDENTITY & LOGOS */}
        <section className="edusync-specimen__section">
          <h2 className="edusync-specimen__section-title">01 · Brand Identity & Logos</h2>
          <div className="edusync-specimen__grid">
            <div className="edusync-specimen__card" style={{ backgroundColor: '#14213D' }}>
              <span className="edusync-specimen__label" style={{ color: '#E4E7EC' }}>BrandLogo on-dark (Large)</span>
              <BrandLogo variant="on-dark" size="lg" />
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">BrandLogo on-light (Medium)</span>
              <BrandLogo variant="on-light" size="md" />
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Symbol Only</span>
              <BrandLogo variant="on-light" size="md" symbolOnly />
            </div>
          </div>
        </section>

        {/* SECTION 2: COLOR SYSTEM TOKENS */}
        <section className="edusync-specimen__section">
          <h2 className="edusync-specimen__section-title">02 · Color System Tokens</h2>
          <div className="edusync-specimen__swatches">
            <div className="edusync-swatch">
              <div className="edusync-swatch__box" style={{ backgroundColor: '#14213D' }} />
              <div className="edusync-swatch__name">Navy</div>
              <div className="edusync-swatch__hex">#14213D</div>
            </div>
            <div className="edusync-swatch">
              <div className="edusync-swatch__box" style={{ backgroundColor: '#3659D9' }} />
              <div className="edusync-swatch__name">Primary</div>
              <div className="edusync-swatch__hex">#3659D9</div>
            </div>
            <div className="edusync-swatch">
              <div className="edusync-swatch__box" style={{ backgroundColor: '#EEF2FF', border: '1px solid #C7D2FE' }} />
              <div className="edusync-swatch__name">Subtle Blue</div>
              <div className="edusync-swatch__hex">#EEF2FF</div>
            </div>
            <div className="edusync-swatch">
              <div className="edusync-swatch__box" style={{ backgroundColor: '#F6F8FC', border: '1px solid #E4E7EC' }} />
              <div className="edusync-swatch__name">Background</div>
              <div className="edusync-swatch__hex">#F6F8FC</div>
            </div>
            <div className="edusync-swatch">
              <div className="edusync-swatch__box" style={{ backgroundColor: '#15803D' }} />
              <div className="edusync-swatch__name">Success</div>
              <div className="edusync-swatch__hex">#15803D</div>
            </div>
            <div className="edusync-swatch">
              <div className="edusync-swatch__box" style={{ backgroundColor: '#92400E' }} />
              <div className="edusync-swatch__name">Warning</div>
              <div className="edusync-swatch__hex">#92400E</div>
            </div>
            <div className="edusync-swatch">
              <div className="edusync-swatch__box" style={{ backgroundColor: '#DC2626' }} />
              <div className="edusync-swatch__name">Error</div>
              <div className="edusync-swatch__hex">#DC2626</div>
            </div>
          </div>
        </section>

        {/* SECTION 3: BUTTON MASTERS */}
        <section className="edusync-specimen__section">
          <h2 className="edusync-specimen__section-title">03 · Button Masters (Node 2:13974)</h2>
          <div className="edusync-specimen__grid">
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Primary (Large 48px)</span>
              <Button variant="primary" size="lg" fullWidth={false}>Sign in</Button>
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Primary Loading</span>
              <Button variant="primary" size="lg" isLoading fullWidth={false}>Signing in…</Button>
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Secondary</span>
              <Button variant="secondary" size="md" fullWidth={false}>Cancel</Button>
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Ghost</span>
              <Button variant="ghost" size="md" fullWidth={false}>View details</Button>
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Link</span>
              <Button variant="link" fullWidth={false}>Forgot password?</Button>
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Destructive</span>
              <Button variant="destructive" size="md" fullWidth={false}>Delete item</Button>
            </div>
          </div>
        </section>

        {/* SECTION 4: INPUT MASTERS */}
        <section className="edusync-specimen__section">
          <h2 className="edusync-specimen__section-title">04 · Input Masters (Node 2:13973)</h2>
          <div className="edusync-specimen__grid">
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Default Input</span>
              <Input
                label="Admin email"
                placeholder="office@maplegrove.edu"
                helperText="Use your school administrator email."
              />
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Password with Eye Toggle</span>
              <Input
                label="Password"
                type="text"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                isPassword
                isPasswordVisible={isPasswordVisible}
                onTogglePasswordVisibility={() => setIsPasswordVisible(!isPasswordVisible)}
                helperText="Your password is case-sensitive."
              />
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Error State</span>
              <Input
                label="Admin email"
                value="invalid-email"
                hasError
                errorMessage="Email or password is incorrect. Check your details and try again."
              />
            </div>
          </div>
        </section>

        {/* SECTION 5: BADGES & STATUS */}
        <section className="edusync-specimen__section">
          <h2 className="edusync-specimen__section-title">05 · Badges & Status (Node 2:13970)</h2>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <Badge variant="info" icon={<img src="/icons/info.svg" alt="Info" width={14} height={14} />}>
              Admin-only access
            </Badge>
            <Badge variant="success" icon={<img src="/icons/circle-check.svg" alt="Success" width={14} height={14} />}>
              Verified active
            </Badge>
            <Badge variant="warning" icon={<img src="/icons/triangle-alert.svg" alt="Warning" width={14} height={14} />}>
              Session expiring
            </Badge>
            <Badge variant="error" icon={<img src="/icons/circle-x.svg" alt="Error" width={14} height={14} />}>
              Access revoked
            </Badge>
            <Badge variant="neutral">
              School administration
            </Badge>
          </div>
        </section>

        {/* SECTION 6: FORM CONTROLS (CHECKBOX & RADIO) */}
        <section className="edusync-specimen__section">
          <h2 className="edusync-specimen__section-title">06 · Checkboxes & Radios (Nodes 11:5893, 11:5894)</h2>
          <div className="edusync-specimen__grid">
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Checkboxes</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Checkbox label="Remember me" checked={checkbox1} onChange={setCheckbox1} />
                <Checkbox label="Email notifications" checked={checkbox2} onChange={setCheckbox2} />
                <Checkbox label="Disabled option" checked={true} disabled onChange={() => {}} />
              </div>
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Radio Buttons</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <Radio
                  name="role"
                  label="Administrator access"
                  checked={radioVal === 'admin'}
                  onChange={() => setRadioVal('admin')}
                />
                <Radio
                  name="role"
                  label="Faculty supervisor"
                  checked={radioVal === 'faculty'}
                  onChange={() => setRadioVal('faculty')}
                />
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 7: OTP & PROGRESS */}
        <section className="edusync-specimen__section">
          <h2 className="edusync-specimen__section-title">07 · OTP Verification & Password Criteria</h2>
          <div className="edusync-specimen__grid">
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">6-Digit OTP Box</span>
              <OTPInput value={otpVal} onChange={setOtpVal} />
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Recovery Step Progress</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <StepProgress currentStep={1} stepLabel="Step 1 of 3 · Request recovery" />
                <StepProgress currentStep={2} stepLabel="Step 2 of 3 · Verification code" />
                <StepProgress currentStep={3} stepLabel="Step 3 of 3 · Reset password" />
              </div>
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Live Password Checklist</span>
              <PasswordChecklist hasMinLength={true} hasUppercase={true} hasNumberOrSymbol={false} />
            </div>
          </div>
        </section>

        {/* SECTION 8: ALERTS & VALIDATION */}
        <section className="edusync-specimen__section">
          <h2 className="edusync-specimen__section-title">08 · Alerts & Validation Messages (Nodes 11:5898, 2:13968)</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <Alert title="Unable to sign in" variant="error">
              Email or password is incorrect. Check your details and try again.
            </Alert>
            <Alert title="Session timeout notice" variant="warning">
              Your session will expire in 5 minutes due to inactivity.
            </Alert>
            <Alert title="Password successfully updated" variant="success">
              You can now sign in using your updated credentials.
            </Alert>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              <ValidationMessage variant="success">Recovery request received.</ValidationMessage>
              <ValidationMessage variant="error">That code is incorrect. Check the email and try again.</ValidationMessage>
              <ValidationMessage variant="info">Enter the code from your recovery email. It expires in 10 minutes.</ValidationMessage>
            </div>
          </div>
        </section>

        {/* SECTION 9: CARDS & DIALOGS */}
        <section className="edusync-specimen__section">
          <h2 className="edusync-specimen__section-title">09 · Cards & Dialogs (Nodes 2:13971, 2:13972)</h2>
          <div className="edusync-specimen__grid">
            <Card elevation="subtle">
              <span className="edusync-specimen__label">Generic Elevation Card</span>
              <p style={{ margin: '8px 0 0', fontSize: '14px', color: '#667085' }}>
                Standard surface container with elevation 01 subtle shadow.
              </p>
            </Card>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">School Identity Card (Left Panel)</span>
              <SchoolContextCard
                schoolName="Maple Grove School"
                description={'School administration, connected.\nUse your school-issued admin account to access EduSync securely.'}
                portalNote="Admin web portal · Authorized access only"
              />
            </div>
            <div className="edusync-specimen__card">
              <span className="edusync-specimen__label">Modal Dialog Trigger</span>
              <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#667085' }}>
                Elevation 03 Overlay modal used for session timeout & confirmation dialogs.
              </p>
              <Tooltip content="Click to preview the session modal">
                <Button variant="secondary" size="md" onClick={() => setIsDialogOpen(true)} fullWidth={false}>
                  Open Sample Dialog
                </Button>
              </Tooltip>
            </div>
          </div>
        </section>

        {/* SECTION 10: TABS, TABLES, TOOLTIPS, PAGINATION */}
        <section className="edusync-specimen__section">
          <h2 className="edusync-specimen__section-title">10 · Navigation & Data Tables (Nodes 11:5895, 11:5896, 11:5899)</h2>
          <Tabs
            activeTab={activeTab}
            onChange={setActiveTab}
            tabs={[
              { id: 'all', label: 'All Administrators', badge: 12 },
              { id: 'roles', label: 'Access Roles', badge: 4 },
              { id: 'security', label: 'Security & 2FA' },
            ]}
          />
          <div style={{ marginTop: '20px' }}>
            <Table
              columns={tableColumns}
              data={sampleTableData}
              keyExtractor={(r) => r.id}
            />
            <Pagination
              currentPage={currentPage}
              totalPages={5}
              onPageChange={setCurrentPage}
            />
          </div>
        </section>
      </div>

      {/* SAMPLE DIALOG */}
      <Dialog isOpen={isDialogOpen} onClose={() => setIsDialogOpen(false)} title="Sample Dialog">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <img src="/icons/info.svg" alt="Info" width={24} height={24} />
            <h3 style={{ margin: 0, fontSize: '20px', fontWeight: 600, color: '#14213D' }}>Admin System Dialog</h3>
          </div>
          <p style={{ margin: 0, fontSize: '14px', lineHeight: '20px', color: '#667085' }}>
            This modal illustrates the Elevation 03 overlay with smooth fade and scale transitions adhering to EduSync design rules.
          </p>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
            <Button variant="secondary" size="md" fullWidth={false} onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="md" fullWidth={false} onClick={() => setIsDialogOpen(false)}>
              Confirm action
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  );
};
