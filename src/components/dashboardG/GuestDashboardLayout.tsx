import React from 'react';
import { Link } from 'react-router-dom';
import { LogOut, ArrowLeft } from 'lucide-react';
import { useGuestAuth } from '../../hooks/useGuestAuth';
import { toast } from 'react-hot-toast';

interface GuestDashboardLayoutProps {
	children: React.ReactNode;
}

const headerContainerStyle: React.CSSProperties = {
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	maxWidth: '1200px',
	margin: '0 auto',
	flexWrap: 'wrap',
	gap: '1rem',
};

const headerMobileStyle: React.CSSProperties = {
	flexDirection: 'column',
	alignItems: 'stretch',
	gap: '0.5rem',
	padding: 0,
};

const GuestDashboardLayout: React.FC<GuestDashboardLayoutProps> = ({ children }) => {
	const { guestUser, signOutGuest } = useGuestAuth();
	const handleSignOut = async () => {
		try {
			await signOutGuest();
			toast.success('Signed out successfully');
		} catch {
			toast.error('Failed to sign out');
		}
	};

	// Responsive: detect mobile
	const [isMobile, setIsMobile] = React.useState(false);
	React.useEffect(() => {
		const checkMobile = () => setIsMobile(window.innerWidth <= 600);
		checkMobile();
		window.addEventListener('resize', checkMobile);
		return () => window.removeEventListener('resize', checkMobile);
	}, []);

	return (
		<div style={{
			minHeight: '100vh',
			background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
		}}>
			{/* Header */}
			<header
				style={{
					background: 'rgba(255, 255, 255, 0.1)',
					backdropFilter: 'blur(10px)',
					borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
					padding: isMobile ? '0.5rem 0.5rem' : '1rem 2rem',
				}}
			>
				<div
					style={
						isMobile
							? { ...headerContainerStyle, ...headerMobileStyle }
							: headerContainerStyle
					}
				>
											{isMobile ? (
												<div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
													<Link
														to="/"
														style={{
															display: 'flex',
															alignItems: 'center',
															gap: '0.5rem',
															color: 'white',
															textDecoration: 'none',
															padding: '0.5rem 1rem',
															borderRadius: '8px',
															background: 'rgba(255, 255, 255, 0.1)',
															border: '1px solid rgba(255, 255, 255, 0.2)',
															transition: 'all 0.3s ease',
															width: '100%',
															justifyContent: 'center',
														}}
														onMouseOver={(e) => {
															e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
														}}
														onMouseOut={(e) => {
															e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
														}}
													>
														<ArrowLeft size={20} />
														Back to Site
													</Link>
													<h1
														style={{
															color: 'white',
															fontSize: '1.3rem',
															fontWeight: 700,
															margin: 0,
															textAlign: 'center',
															width: '100%',
															letterSpacing: '0.01em',
														}}
													>
														Guest Dashboard
													</h1>
												</div>
											) : (
												<div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
													<Link
														to="/"
														style={{
															display: 'flex',
															alignItems: 'center',
															gap: '0.5rem',
															color: 'white',
															textDecoration: 'none',
															padding: '0.5rem 1rem',
															borderRadius: '8px',
															background: 'rgba(255, 255, 255, 0.1)',
															border: '1px solid rgba(255, 255, 255, 0.2)',
															transition: 'all 0.3s ease',
														}}
														onMouseOver={(e) => {
															e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
														}}
														onMouseOut={(e) => {
															e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
														}}
													>
														<ArrowLeft size={20} />
														Back to Site
													</Link>
													<h1
														style={{
															color: 'white',
															fontSize: '1.7rem',
															fontWeight: 700,
															margin: 0,
															textAlign: 'left',
															letterSpacing: '0.01em',
														}}
													>
														Guest Dashboard
													</h1>
												</div>
											)}
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '1rem',
							flexDirection: isMobile ? 'column' : 'row',
							width: isMobile ? '100%' : undefined,
							justifyContent: isMobile ? 'center' : undefined,
							marginTop: isMobile ? '0.5rem' : undefined,
						}}
					>
						<span
							style={{
								color: 'rgba(255, 255, 255, 0.9)',
								fontSize: '0.9rem',
								textAlign: isMobile ? 'center' : undefined,
							}}
						>
							Welcome, {guestUser?.name || 'Guest'}!
						</span>
						<button
							onClick={handleSignOut}
							style={{
								display: 'flex',
								alignItems: 'center',
								gap: '0.5rem',
								color: 'white',
								background: 'rgba(255, 255, 255, 0.1)',
								border: '1px solid rgba(255, 255, 255, 0.2)',
								padding: '0.5rem 1rem',
								borderRadius: '8px',
								cursor: 'pointer',
								fontSize: '0.9rem',
								transition: 'all 0.3s ease',
								width: isMobile ? '100%' : undefined,
								justifyContent: isMobile ? 'center' : undefined,
							}}
							onMouseOver={(e) => {
								e.currentTarget.style.background = 'rgba(255, 99, 99, 0.3)';
							}}
							onMouseOut={(e) => {
								e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
							}}
						>
							<LogOut size={16} />
							Sign Out
						</button>
					</div>
				</div>
			</header>
			{/* Main Content */}
			<main
				style={{
					padding: isMobile ? '1rem 0.5rem' : '2rem',
					maxWidth: '1200px',
					margin: '0 auto',
				}}
			>
				{children}
			</main>
		</div>
	);
};
export default GuestDashboardLayout;
