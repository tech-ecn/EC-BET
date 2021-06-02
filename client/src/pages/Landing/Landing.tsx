import React from 'react'
import './Landing.scss'
import LogoNav from '../../components/LogoNav/LogoNav'
import {
	landingImageOne,
	processFirst,
	processSec,
	processThird,
	devicesImage,
	allInOne,
	multiplePlatforms,
	responsive,
	scalability,
	userExperience,
	security,
} from '../../assets/index'
import { Questions } from '../../components/Question/Question'

export const Landing: React.FC = () => {
	const [currsection, setCurrsection] = React.useState<1 | 2 | 3 | 4>(1)

	const getQuestions = React.useCallback((value: 1 | 2 | 3 | 4) => {
		switch (value) {
			case 1:
				return (
					<div id='sectionOne'>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
					</div>
				)
			case 2:
				return (
					<div id='sectionTwo'>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
					</div>
				)
			case 3:
				return (
					<div id='sectionThree'>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?' key={Math.random()}>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
					</div>
				)
			case 4:
				return (
					<div id='sectionFour'>
						<Questions name='What is Lorem Ipsum?'>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?'>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?'>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
						<Questions name='What is Lorem Ipsum?'>
							It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
							It was popularised in the 1960s with the release
						</Questions>
					</div>
				)
			default:
				return
		}
	}, [])
	console.log(currsection)
	return (
		<>
			<div className='LANDING'>
				<div className='landingTopSection'>
					<LogoNav />
					<div className='landingTopDataContainer'>
						<div id='textContainer'>
							<p>
								Head-to-Head bets allow for users to bet on particular <br />
								outcomes with a 50/50 outcome.
							</p>
							<p id='boldData'>
								PLATFORM FOR HEAD TO
								<span> HEAD BETTING</span>
							</p>
							<p>
								The EC betting platform allows for holders of the ECN token to participate in Head-to-Head bets against community
								members and also participate in pool betting scenarios.
							</p>
							<button>Get Started </button>
						</div>
						<img src={landingImageOne} alt='landingone-img' />
					</div>
				</div>
				<div className='landingCenterSection'>
					<div className='workdemoContainer'>
						<div className='processesHeading'>
							<p>How it works</p>
							<p>Get Started with Easiest Steps</p>
						</div>
						<div id='imageContainer'>
							<div className='imageSection'>
								<div className='data'>
									<img src={processFirst} alt='first-process' />
									<p className='heading'>Make a bet and Publish</p>
									<p>just make a bet and publish on network and wait of some other user to join.</p>
								</div>
								<div className='vertical'></div>
							</div>
							<div className='imageSection'>
								<div className='data'>
									<img src={processSec} alt='second-process' />
									<p className='heading'>Other members join and bet</p>
									<p>As soon as other member joins the bet and agrees to terms bet starts untill result.</p>
								</div>
								<div className='vertical'></div>
							</div>
							<div className='imageSection'>
								<div className='data'>
									<img src={processThird} alt='third-process' />
									<p className='heading'>Get Rewarded with ECN </p>
									<p>Get real ECN tokens when you win which you can exchange with real money</p>
								</div>
							</div>
						</div>
					</div>
					<div className='ecbetNetworkContainer'>
						<div className='networkDataContainer'>
							<p className='heading'>EC Bet Network</p>
							<p>
								The EC Bet Network (token ticker: ECN) is a deflationary ERC-20 token with decentralized finance at the heart of its
								ecosystem driven by Blockchain technology. The premise of this project is the production of award-winning staking and
								betting decentralized applications (dApps) that appeal to all betting enthusiasts and those seeking rewards for
								long-term participation as stakeholders. The overarching aim, by making use of Blockchain technology is to produce the
								first truly decentralized driven betting and staking platform where the house no longer wins, and all rewards are
								returned to the consumer.
							</p>
							<button>Get Started </button>
						</div>
						<img src={devicesImage} alt='devices-img' />
					</div>
					<div className='featuresContainer'>
						<div className='stack'>
							<div className='featureContainer'>
								<img src={scalability} alt='scalability-img' />
								<div className='data'>
									<p>Scalability</p>
									<p>
										Gaming protocols built on Layer-2 solutions provided by Matic Network. Allowing for high speed and low cost
										transactions, a breakthrough in Blockchain technology.
									</p>
								</div>
							</div>
							<div className='featureContainer'>
								<img src={userExperience} alt='user-experience-img' />
								<div className='data'>
									<p>User Experience</p>
									<p>
										Protocols designed for user adoption and ease of use; even though processes are built on high tech
										architecture and complicated framework.
									</p>
								</div>
							</div>
							<div className='featureContainer'>
								<img src={security} alt='security-img' />
								<div className='data'>
									<p>Security</p>
									<p>
										All protocols are built on-chain therefore, remain immutable on the blockchain. All smart contracts audited by
										renowned blockchain professionals
									</p>
								</div>
							</div>
						</div>
						<div className='stack'>
							<div className='featureContainer'>
								<img src={allInOne} alt='all-in-one-img' />
								<div className='data'>
									<p>
										All-In-One Defi <span>Platform</span>
									</p>
									<p>
										Gaming protocols built on Layer-2 solutions provided by Matic Network. Allowing for high speed and low cost
										transactions, a breakthrough in Blockchain technology.
									</p>
								</div>
							</div>
							<div className='featureContainer'>
								<img src={multiplePlatforms} alt='multiple-platforms-img' />
								<div className='data'>
									<p>
										Multiple <span>Platforms</span>
									</p>
									<p>
										Protocols designed for user adoption and ease of use; even though processes are built on high tech
										architecture and complicated framework.
									</p>
								</div>
							</div>
							<div className='featureContainer'>
								<img src={responsive} alt='responsive-team-img' />
								<div className='data'>
									<p>
										Responsive <span>Support Team</span>
									</p>
									<p>
										All protocols are built on-chain therefore, remain immutable on the blockchain. All smart contracts audited by
										renowned blockchain professionals
									</p>
								</div>
							</div>
						</div>
					</div>
					<div className='questionsContainer'>
						<p>Got Any Questions</p>
						<p id='important'>WE'VE GOT ANSWERS</p>
						<div className='options-container'>
							<p onClick={() => setCurrsection(1)}>BASIC ASKS</p>
							<p onClick={() => setCurrsection(2)}>INVESTING QUESTION</p>
							<p onClick={() => setCurrsection(3)}>WITHDRAWAL QUESTION</p>
							<p onClick={() => setCurrsection(4)}>REFERRAL PROGRAM</p>
						</div>
						<div className='questionsSection'>{getQuestions(currsection)}</div>
					</div>
					<div className='newsletterContainer'>
						<p id='heading'>Subscribe to stay updated on the project progress</p>
						<div id='emailContainer'>
							<input type='email' name='email' placeholder='Enter email address ' />
							<button>Subscribe </button>
						</div>
						<p id='disclaimer'>
							* By submitting this form you are agreeing to receive communications from EC Bet Network. To see how we use your
							information please see our privacy policy
						</p>
					</div>
				</div>
				<div className='footerContainer'>© 2021 EC Bet Network. All Rights Reserved</div>
			</div>
		</>
	)
}
