import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

const solutionCardItems = [
  {
    image: '/images/solution/solution-card-shac-ai.png',
    width: 369,
    height: 380,
    alt: '도시 데이터와 ShaC AI 칩을 표현한 초정밀 영상 솔루션',
    title: 'ShaC AI 초정밀 영상 알고리즘',
    description: 'AI Smart City의 통합 종합관제를 위한 핵심 솔루션',
    points: [
      '지능형 감지 시스템과 자동 침입 검출',
      '교통, 환경, 안전, 의료, 에너지 데이터 통합',
      'IoT와 빅데이터 기반 도시 운영',
      '공간정보 인프라와 시민 체감 서비스 구현',
    ],
  },
  {
    image: '/images/solution/solution-card-smart-factory.png',
    width: 368,
    height: 378,
    alt: '스마트팩토리 생산 라인에 적용된 AI 비전 검사 시스템',
    title: '스마트팩토리 ShaC AI 비전',
    description: '머신비전 기반 산업 혁신을 이끄는 초정밀 검사 시스템',
    points: [
      'Smart Factory와 Dark Factory용 AI 카메라',
      '강판 제품 결함 탐지와 분류',
      '로봇 공정, 5G, 클라우드 연동',
      '우폐 탐지 및 2차전지 공정 적용',
    ],
  },
  {
    image: '/images/solution/solution-card-smart-logistics.png',
    width: 370,
    height: 380,
    alt: '교차로와 물류 흐름을 분석하는 AI 딥러닝 관제 화면',
    title: 'AI Deep Learning 관제 솔루션',
    description: '도시와 물류 흐름을 실시간으로 읽는 지능형 분석 기술',
    points: [
      'GPU 병렬 프로세싱 기반 고속 분석',
      '저전력 소셜 및 엣지 처리',
      '시스템 소형화와 모듈화',
      '타일 인식 기반 초고속 병렬 영상 처리',
    ],
  },
  {
    image: '/images/solution/solution-card-medical-ai.png',
    width: 366,
    height: 380,
    alt: '차량 내부와 의료 영상 기술을 결합한 ShaC AI 카메라 솔루션',
    title: 'ShaC AI 캠 및 의료영상 기술',
    description: '카메라와 라이다를 대체하는 고해상도 AI 영상 플랫폼',
    points: [
      '초고성능 영상 탐지와 3차원 객체 검출',
      '자율주행 센서 보완 및 대체',
      '원천 알고리즘 기반 영상 품질 개선',
      '의료 영상 분석과 정밀 진단 확장',
    ],
  },
]

const navigationLinks = [
  { href: '#market', label: '시장분석' },
  { href: '#technology-1', label: '핵심기술1' },
  { href: '#technology-2', label: '핵심기술2' },
  { href: '#clinical', label: '임상증거' },
  { href: '#comparison', label: '경쟁비교' },
  { href: '#capability', label: '기업역량' },
  { href: '#strategy', label: '전략' },
]

const contentSections = [
  {
    className: 'smart-city-section',
    id: 'technology-1',
    titleId: 'smart-city-title',
    title: '“시민을 위한, AI로 완성되는 [Infact Vision] 초정밀 통합 스마트 시티의 시작”',
    subtitle: 'INPEGVISION AI 스마트 시티 통합 관제 핵심 솔루션',
    imageFirst: true,
    image: {
      src: '/images/smart-city/smart-city-integrated-platform.png',
      alt: 'AI 스마트 시티 통합 관제 플랫폼',
      width: 1045,
      height: 670,
    },
    bodyTitle:
      'INPEGVISION이 시민들께 드리는 ShaC AI 초정밀시 스마트시티 통합관제 핵심 솔루션',
    points: [
      '초정밀 지능형 검지 시스템',
      '전 분야 통합 종합 관제',
      '데이터 기반 선제적 도시 운영',
      '신기술 융복합 공간정보 인프라',
      '시민 체감형 공공 서비스 구현',
    ],
  },
  {
    className: 'smart-factory-section',
    id: 'technology-2',
    titleId: 'smart-factory-title',
    title: '“보이지 않는 결함까지 포착하는 AI의 눈”',
    subtitle: 'ShaC AI 초정밀 머신비전으로 완성하는 스마트·다크팩토리 혁신',
    imageFirst: false,
    image: {
      src: '/images/smart-factory/smart-factory-ai-automation.png',
      alt: 'AI 기반 스마트팩토리 자동화 시스템',
      width: 832,
      height: 804,
    },
    bodyTitle: '핵심 장점 5가지 (Key Benefits)',
    points: [
      '초정밀 결함 검출 기술',
      '완전 무인화 대응 (Dark Factory 최적화)',
      'AI + 빅데이터 기반 지속 학습',
      '다양한 산업 적용 확장성',
      'ICT 융합 스마트 제조 플랫폼',
    ],
  },
  {
    className: 'smart-traffic-section',
    id: 'comparison',
    titleId: 'smart-traffic-title',
    title: '“도시의 흐름을 읽는 AI 교차로”',
    subtitle: 'ShaC AI 기반 스마트 인터섹션으로 안전·효율·속도를 동시에 혁신합니다',
    imageFirst: true,
    image: {
      src: '/images/smart-rotary/면5.스마트교차로.png',
      alt: 'AI 기반 스마트 교차로 관제 시스템',
      width: 1024,
      height: 624,
    },
    bodyTitle: 'ShaC AI 기반 스마트 인터섹션으로 안전·효율·속도를 동시에 혁신',
    bodyDescription:
      '교차로의 차량, 보행자, 신호 흐름을 실시간으로 분석해 도시 교통 운영의 정밀도를 높입니다.',
    points: [
      'AI 딥러닝 기반 초정밀 인식',
      '초고속 GPU 병렬 영상처리',
      '실시간 교통 흐름 제어 시스템',
      '교차로 위험 상황 선제 감지',
      '검증된 공공 인증 기술력',
    ],
  },
  {
    className: 'autonomous-section',
    id: 'capability',
    titleId: 'autonomous-title',
    title: '“자율자동차가 세상을 ‘보는’ 방식을 ShaC AI가 바꿉니다”',
    subtitle: '초정밀 영상 알고리즘으로 완성하는 자율주행의 새로운 눈',
    imageFirst: false,
    image: {
      src: '/images/autonomous/autonomous-vehicle-ai-detection.png',
      alt: '자율주행 차량의 AI 객체 감지 시스템',
      width: 987,
      height: 763,
    },
    bodyTitle: 'ShaC AI 기반 스마트 인식으로 안전·효율·속도를 동시에 혁신',
    bodyDescription:
      '카메라 기반 초정밀 인식과 영상 전처리 기술로 주야간, 전천후 환경에서도 흔들림 없는 객체 감지를 지원합니다.',
    points: [
      '영상 품질 증대(Image Quality Enhancement)',
      '초단지연 안정화 기능',
      '초단지연 안개 제거 기능',
      '주야간 실시간 객체 검출',
      '카메라 내장형 영상 전처리 시스템 온 칩(SoC)',
    ],
  },
  {
    className: 'medical-section',
    id: 'clinical',
    titleId: 'medical-title',
    title: '“보이지 않던 병변까지 찾아내는 세계 유일 AI 의료영상 기술”',
    subtitle:
      '기존 ISP 한계를 극복한 원천 알고리즘 AI ShaC로 MRI·CT·X-ray 원본 화질을 개선합니다.',
    imageFirst: true,
    image: {
      src: '/images/medical/medical-ai-diagnostic-system.png',
      alt: 'AI 의료영상 진단 시스템이 적용된 정밀 검사 장비',
      width: 988,
      height: 759,
    },
    bodyTitle: '보이지 않던 1mm를 찾아내는 가장 선명한 확신',
    bodyDescription:
      '초정밀 영상 복원과 AI 분석 기술로 의료진이 더 빠르고 선명하게 병변을 판독할 수 있도록 지원합니다.',
    points: [
      'GE·Philips·Siemens 공급 추진, FDA 510(k) 인증 추진',
      'MRI·CT·X-ray 기존 장비 호환 설치',
      'AI ShaC Medical Imaging Platform',
      '기존 ISP 한계를 극복한 원천 알고리즘',
      '원본 영상 화질 자체를 개선하는 AI 영상 처리',
    ],
  },
]

function ContentSection({ section }) {
  const { className, id, titleId, title, subtitle, imageFirst, image, bodyTitle, bodyDescription, points } =
    section

  const imageElement = (
    <img
      className={`${className}__image`}
      src={image.src}
      alt={image.alt}
      width={image.width}
      height={image.height}
      loading="lazy"
      decoding="async"
    />
  )

  const textElement = (
    <div className={`${className}__text`}>
      <h3>{bodyTitle}</h3>
      {bodyDescription && <p>{bodyDescription}</p>}
      <ul>
        {points.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
    </div>
  )

  return (
    <section className={className} id={id} aria-labelledby={titleId}>
      <div className={`${className}__intro`}>
        <h2 id={titleId}>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <div className={`${className}__content`}>
        {imageFirst ? imageElement : textElement}
        {imageFirst ? textElement : imageElement}
      </div>
    </section>
  )
}

function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileMenuCloseRef = useRef(null)

  const handleGoToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false)
  }, [])

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return undefined
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeMobileMenu()
      }
    }

    const originalOverflow = document.body.style.overflow

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    mobileMenuCloseRef.current?.focus()

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [closeMobileMenu, isMobileMenuOpen])

  return (
    <>
      <header className="site-header">
        <div className="site-header__inner">
          <a className="site-header__logo-link" href="/" aria-label="INPEG Vision 홈">
            <img
              className="site-header__logo"
              src="/images/logo/logo-inpeg-vision.png"
              alt="INPEG Vision"
              width="141"
              height="147"
              fetchPriority="high"
            />
          </a>

          <nav className="site-header__nav" aria-label="주요 메뉴">
            <ul className="site-header__menu">
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="site-header__actions" aria-label="보조 메뉴">
            <a className="site-header__button site-header__button--secondary" href="#clinical">
              임상 증거
            </a>
            <button className="site-header__button site-header__button--ghost" type="button">
              로그인
            </button>
            <a className="site-header__button site-header__button--primary" href="#contact-info">
              도입 문의
            </a>
          </nav>

          <button
            className="mobile-menu-toggle"
            type="button"
            aria-label="모바일 메뉴 열기"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu-panel"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>

        <div
          className={`mobile-menu-panel${isMobileMenuOpen ? ' is-open' : ''}`}
          id="mobile-menu-panel"
          role="dialog"
          aria-label="모바일 메뉴"
          aria-modal="true"
          aria-hidden={!isMobileMenuOpen}
          hidden={!isMobileMenuOpen}
        >
          <div className="mobile-menu-panel__header">
            <img
              className="mobile-menu-panel__logo"
              src="/images/logo/logo-inpeg-vision.png"
              alt="INPEG Vision"
              width="141"
              height="147"
              loading="lazy"
              decoding="async"
            />
            <button
              ref={mobileMenuCloseRef}
              className="mobile-menu-close"
              type="button"
              aria-label="모바일 메뉴 닫기"
              onClick={closeMobileMenu}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </button>
          </div>

          <nav className="mobile-menu-panel__nav" aria-label="모바일 주요 메뉴">
            <ul>
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} onClick={closeMobileMenu}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <div className="hero__text">
            <h1 id="hero-title">보이지 않던 데이터, 이제는 보인다</h1>
            <p>인펙비전 ShaC AI, 초정밀 영상으로 도시의 눈을 다시 정의합니다.</p>
          </div>
        </div>
      </section>

      <section className="solution-overview" id="market" aria-labelledby="solution-title">
        <div className="solution-overview__inner">
          <div className="solution-overview__header">
            <h2 id="solution-title">
              INPEG Vision의 ShaC AI로 완성하는 초정밀 영상의 눈을 제공합니다.
            </h2>
            <p>
              AI Smart City, AI 초정밀 의료영상시스템, AI 스마트팩토리시스템,
              AI Rotary 시스템, 자율주행
            </p>
          </div>

          <div className="solution-overview__grid">
            {solutionCardItems.map((card) => (
              <article className="solution-card" key={card.title}>
                <img
                  className="solution-card__image"
                  src={card.image}
                  alt={card.alt}
                  width={card.width}
                  height={card.height}
                  loading="lazy"
                  decoding="async"
                />
                <div className="solution-card__body">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                  <ul>
                    {card.points.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {contentSections.map((section) => (
        <ContentSection key={section.id} section={section} />
      ))}

      <nav className="section-navigation" aria-label="섹션 이동">
        <button className="section-navigation__button" type="button" aria-label="이전 섹션 보기">
          <img
            src="/images/icons/icon-arrow-left.png"
            alt=""
            aria-hidden="true"
            width="82"
            height="82"
            loading="lazy"
            decoding="async"
          />
        </button>
        <button className="section-navigation__button" type="button" aria-label="다음 섹션 보기">
          <img
            src="/images/icons/icon-arrow-right.png"
            alt=""
            aria-hidden="true"
            width="82"
            height="82"
            loading="lazy"
            decoding="async"
          />
        </button>
      </nav>

      <footer className="site-footer" id="strategy">
        <div className="site-footer__inner">
          <div className="site-footer__brand">
            <p className="site-footer__headline">
              대한민국의 더 큰 내일을 설계하는 인펙비전
            </p>

            <img
              className="site-footer__logo"
              src="/images/logo/logo-inpeg-vision.png"
              alt="INPEG Vision"
              width="141"
              height="147"
              loading="lazy"
              decoding="async"
            />

            <button
              className="site-footer__top-button"
              type="button"
              aria-label="페이지 상단으로 이동"
              onClick={handleGoToTop}
            >
              <span>Go To Top</span>
              <img
                src="/images/icons/icon-top-arrow.png"
                alt=""
                aria-hidden="true"
                width="43"
                height="43"
                loading="lazy"
                decoding="async"
              />
            </button>
          </div>

          <div className="site-footer__info" id="contact-info">
            <dl>
              <div>
                <dt>연구소/공장</dt>
                <dd>
                  부산광역시 금정구 금강로 585, 3층(구서동)
                  <br />
                  T. 051-514-0008 F. 051-515-4580
                </dd>
              </div>
              <div>
                <dt>AS센터</dt>
                <dd>
                  부산광역시 금정구 금강로 585, 3층(구서동)
                  <br />
                  T. 1899-3938 F. 051-515-4580
                </dd>
              </div>
              <div>
                <dt>영업본부</dt>
                <dd>
                  서울특별시 강서구 마곡중앙4로 10, 마곡그랑트윈타워 A동 418호
                  <br />
                  T. 02-863-0020
                </dd>
              </div>
              <div>
                <dt>이메일</dt>
                <dd>contact@inpegvision.com</dd>
              </div>
            </dl>

            <p className="site-footer__legal">
              개인정보처리방침 | 이메일 무단수집거부
              <br />
              Copyright © INPEGVISION CO.,LTD. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default App
