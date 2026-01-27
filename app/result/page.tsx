"use client";

import { useSearchParams } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/LanguageProvider';
import Link from 'next/link';
import { Suspense, useState, useEffect, useRef } from 'react';
import { ChevronDown, Hand } from 'lucide-react';

function ResultContent() {
  const searchParams = useSearchParams();
  const style = searchParams.get('style');
  const { lang } = useLanguage();
  const [isGrayscale, setIsGrayscale] = useState(true);
  const firstFragranceRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // basePath 가져오기 (GitHub Pages용)
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const styleNames: Record<string, { ko: string; en: string }> = {
    // 여성
    cleanGirl: { ko: '클린걸', en: 'Clean Girl' },
    softGirl: { ko: '소프트걸', en: 'Soft Girl' },
    coquette: { ko: '코켓', en: 'Coquette' },
    lightAcademia: { ko: '라이트 아카데미아', en: 'Light Academia' },
    darkAcademia: { ko: '다크 아카데미아', en: 'Dark Academia' },
    balletcore: { ko: '발레코어', en: 'Balletcore' },
    moriGirl: { ko: '모리걸', en: 'Mori Girl' },
    acubi: { ko: '아쿠비', en: 'Acubi' },
    mobWife: { ko: '몹 와이프', en: 'Mob Wife' },
    rockstar: { ko: '락스타', en: 'Rockstar' },
    vampire: { ko: '뱀파이어', en: 'Vampire' },
    bossBabe: { ko: '보스 베이브', en: 'Boss Babe' },
    // 남성
    cleanBoy: { ko: '클린 보이', en: 'Clean Boy' },
    softBoy: { ko: '소프트 보이', en: 'Soft Boy' },
    darkAcademiaBoy: { ko: '다크 아카데미아 보이', en: 'Dark Academia Boy' },
    naturalBoy: { ko: '내츄럴 보이', en: 'Natural Boy' },
    streetBoy: { ko: '스트릿 보이', en: 'Street Boy' },
    rockBoy: { ko: '락 보이', en: 'Rock Boy' },
    gentleBoy: { ko: '젠틀 보이', en: 'Gentle Boy' },
    techBoy: { ko: '테크 보이', en: 'Tech Boy' },
  };

  const aestheticDescriptions: Record<string, string> = {
    // 여성
    "Clean Girl": "비누향이 날 것 같은 깨끗하고 미니멀한 분위기",
    "Light Academia": "책과 커피 향이 어울리는 클래식한 무드",
    "Soft Girl": "사랑스럽고 포근한 감성, 로맨틱한 무드",
    "Balletcore": "우아한 여성스러움, 클래식한 발레리나",
    "Dark Academia": "오래된 책장 앞에서 사색하는 지적인 무드",
    "Mori Girl": "햇살 드는 숲속의 몽환적이고 순수한 무드",
    "Mob Wife": "이탈리안 마피아 부인처럼 대담하고 강렬한 여성미",
    "Acubi": "몽환적인 Y2K 감성, 슬픔과 귀여움이 섞인 얼음빛 무드",
    "Rockstar": "자유롭고 반항적인 매력, 무너짐 속에서도 카리스마가 느껴지는 감각",
    "Vampire": "관능적이면서도 고요한 미, 차가운 피부와 붉은 피의 대비",
    "Boss Babe": "프로페셔널하고 당당한 카리스마, 도시적이고 정제된 파워 뷰티",
    // 남성
    "Clean Boy": "깔끔하고 단정한 미니멀 감성, 도시적인 세련미",
    "Soft Boy": "감성적이고 따뜻한 무드, 부드러운 매력",
    "Dark Academia Boy": "지적이고 클래식한 감성, 깊이 있는 분위기",
    "Natural Boy": "자연스러움, 편안함 중심의 스타일",
    "Street Boy": "자유롭고 트렌디한 감성, 개성 있는 스타일",
    "Rock Boy": "강렬하고 예술적인 무드, 반항적인 자유",
    "Gentle Boy": "품격 있고 성숙한 무드, 클래식 신사 스타일",
    "Tech Boy": "미니멀하고 기능적인 하이테크 감성, 도시적인 무드",
  };

  const fragranceData: Record<string, { name: string; koreanName: string; description: string }[]> = {
    // 여성
    cleanGirl: [
      { name: 'lily_owen', koreanName: '릴리 오웬', description: '봄비에 젖어 흐르는 꽃잎들.' },
      { name: 'toit_vert', koreanName: '트와 베르', description: '수분기 가득한 식물원의 공기.' },
    ],
    softGirl: [
      { name: 'susie_salmon', koreanName: '수지살몬', description: '달콤한 과일을 먹은 뒤 낮잠.' },
      { name: 'wegener', koreanName: '베게너', description: '화려한 색감의 생화로 만든 꽃다발.' },
    ],
    lightAcademia: [
      { name: 'marine_orchid', koreanName: '마린 오키드', description: '인적이 드문 해안도로에서의 드라이빙.' },
      { name: 'kyujang', koreanName: '규장', description: '오래된 종이에서 느껴지는 시간의 향.' },
    ],
    darkAcademia: [
      { name: 'kyujang', koreanName: '규장', description: '오래된 종이에서 느껴지는 시간의 향.' },
      { name: 'violette', koreanName: '비올레뜨', description: '가을 달빛을 머금은 보라꽃.' },
    ],
    balletcore: [
      { name: 'wegener', koreanName: '베게너', description: '화려한 색감의 생화로 만든 꽃다발.' },
      { name: 'susie_salmon', koreanName: '수지살몬', description: '달콤한 과일을 먹은 뒤 낮잠.' },
    ],
    moriGirl: [
      { name: 'lucien_carr', koreanName: '루시엔 카', description: '안개 낀 소나무 숲에서의 산책.' },
      { name: 'susie_salmon', koreanName: '수지살몬', description: '달콤한 과일을 먹은 뒤 낮잠.' },
    ],
    mobWife: [
      { name: 'violette', koreanName: '비올레뜨', description: '가을 달빛을 머금은 보라꽃.' },
      { name: 'wegener', koreanName: '베게너', description: '화려한 색감의 생화로 만든 꽃다발.' },
    ],
    acubi: [
      { name: 'kyujang', koreanName: '규장', description: '오래된 종이에서 느껴지는 시간의 향.' },
      { name: 'roland', koreanName: '롤랑', description: '도망쳐 온 낙원의 풍경.' },
    ],
    rockstar: [
      { name: 'roland', koreanName: '롤랑', description: '도망쳐 온 낙원의 풍경.' },
      { name: 'marine_orchid', koreanName: '마린 오키드', description: '인적이 드문 해안도로에서의 드라이빙.' },
    ],
    vampire: [
      { name: 'violette', koreanName: '비올레뜨', description: '가을 달빛을 머금은 보라꽃.' },
      { name: 'lucien_carr', koreanName: '루시엔 카', description: '안개 낀 소나무 숲에서의 산책.' },
    ],
    bossBabe: [
      { name: 'wegener', koreanName: '베게너', description: '화려한 색감의 생화로 만든 꽃다발.' },
      { name: 'toit_vert', koreanName: '트와 베르', description: '수분기 가득한 식물원의 공기.' },
    ],
    // 남성
    cleanBoy: [
      { name: 'toit_vert', koreanName: '트와 베르', description: '수분기 가득한 식물원의 공기.' },
      { name: 'marine_orchid', koreanName: '마린 오키드', description: '인적이 드문 해안도로에서의 드라이빙.' },
    ],
    softBoy: [
      { name: 'toit_vert', koreanName: '트와 베르', description: '수분기 가득한 식물원의 공기.' },
      { name: 'lucien_carr', koreanName: '루시엔 카', description: '안개 낀 소나무 숲에서의 산책.' },
    ],
    darkAcademiaBoy: [
      { name: 'kyujang', koreanName: '규장', description: '오래된 종이에서 느껴지는 시간의 향.' },
      { name: 'violette', koreanName: '비올레뜨', description: '가을 달빛을 머금은 보라꽃.' },
    ],
    naturalBoy: [
      { name: 'lucien_carr', koreanName: '루시엔 카', description: '안개 낀 소나무 숲에서의 산책.' },
      { name: 'toit_vert', koreanName: '트와 베르', description: '수분기 가득한 식물원의 공기.' },
    ],
    streetBoy: [
      { name: 'marine_orchid', koreanName: '마린 오키드', description: '인적이 드문 해안도로에서의 드라이빙.' },
      { name: 'roland', koreanName: '롤랑', description: '도망쳐 온 낙원의 풍경.' },
    ],
    rockBoy: [
      { name: 'roland', koreanName: '롤랑', description: '도망쳐 온 낙원의 풍경.' },
      { name: 'marine_orchid', koreanName: '마린 오키드', description: '인적이 드문 해안도로에서의 드라이빙.' },
    ],
    gentleBoy: [
      { name: 'violette', koreanName: '비올레뜨', description: '가을 달빛을 머금은 보라꽃.' },
      { name: 'kyujang', koreanName: '규장', description: '오래된 종이에서 느껴지는 시간의 향.' },
    ],
    techBoy: [
      { name: 'marine_orchid', koreanName: '마린 오키드', description: '인적이 드문 해안도로에서의 드라이빙.' },
      { name: 'violette', koreanName: '비올레뜨', description: '가을 달빛을 머금은 보라꽃.' },
    ],
  };

  const styleName = style && styleNames[style as keyof typeof styleNames]
    ? (lang === 'ko' || lang === 'en' 
        ? styleNames[style as keyof typeof styleNames][lang]
        : styleNames[style as keyof typeof styleNames]['en']) // cn, jp는 영어로 폴백
    : (lang === 'ko' ? '알 수 없음' : 'Unknown');

  // 영문 스타일명으로 aesthetic description 찾기
  const styleNameEn = style && styleNames[style as keyof typeof styleNames]
    ? styleNames[style as keyof typeof styleNames]['en']
    : 'Unknown';
  
  const aestheticDescription = aestheticDescriptions[styleNameEn] || '';

  // 남성 에겐(논테토) 스타일 목록
  const maleEgenStyles = ['cleanBoy', 'softBoy', 'darkAcademiaBoy', 'naturalBoy'];
  
  // 남성 테토 스타일 목록
  const maleTetoStyles = ['rockBoy', 'gentleBoy', 'streetBoy', 'techBoy'];
  
  // 여성 에겐 스타일 목록
  const femaleEgenStyles = ['balletcore', 'cleanGirl', 'darkAcademia', 'lightAcademia', 'moriGirl', 'softGirl'];
  
  // 여성 테토 스타일 목록
  const femaleTetoStyles = ['acubi', 'bossBabe', 'mobWife', 'rockstar', 'vampire'];
  
  // 이미지 스타일 전체 (남성 논테토 + 남성 테토 + 여성 에겐 + 여성 테토)
  const imageStyles = [...maleEgenStyles, ...maleTetoStyles, ...femaleEgenStyles, ...femaleTetoStyles];
  const isImageStyle = style && imageStyles.includes(style);

  // 남성 에겐(논테토) 스타일 이미지 매핑
  const maleEgenImages: Record<string, string> = {
    darkAcademiaBoy: 'png/academiaboy.png',
    cleanBoy: 'png/cleanboy.png',
    naturalBoy: 'png/naturalboy.png',
    softBoy: 'png/softboy.png',
  };

  // 남성 테토 스타일 이미지 매핑
  const maleTetoImages: Record<string, string> = {
    rockBoy: 'png/rockboy.png',
    gentleBoy: 'png/gentleboy.png',
    streetBoy: 'png/streetboy.png',
    techBoy: 'png/techboy.png',
  };

  // 여성 에겐 스타일 이미지 매핑
  const femaleEgenImages: Record<string, string> = {
    balletcore: 'png/ballecoregirl.png',
    cleanGirl: 'png/cleangirl.png',
    darkAcademia: 'png/darkacademiagirl.png',
    lightAcademia: 'png/liteacademiagirl.png',
    moriGirl: 'png/morigirl.png',
    softGirl: 'png/softgirl.png',
  };

  // 여성 테토 스타일 이미지 매핑
  const femaleTetoImages: Record<string, string> = {
    acubi: 'png/acubi.png',
    bossBabe: 'png/bossbaby.png',
    mobWife: 'png/mobwife.png',
    rockstar: 'png/rockstar.png',
    vampire: 'png/vampire.png',
  };

  // 전체 이미지 매핑 (남성 논테토 + 남성 테토 + 여성 에겐 + 여성 테토)
  const allImages: Record<string, string> = {
    ...maleEgenImages,
    ...maleTetoImages,
    ...femaleEgenImages,
    ...femaleTetoImages,
  };

  // 흰색 버튼/아이콘이 필요한 스타일 목록
  const whiteButtonStyles = ['darkAcademiaBoy', 'bossBabe', 'darkAcademia', 'gentleBoy', 'mobWife', 'rockBoy', 'rockstar', 'streetBoy', 'vampire', 'techBoy'];
  const needsWhiteButton = style && whiteButtonStyles.includes(style);

  const fragrances = style ? fragranceData[style] || [] : [];

  // 스크롤 위치에 따른 흑백/컬러 전환 로직 (스크롤 컨테이너 감지)
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) {
      // ref가 아직 설정되지 않았으면 다음 프레임에서 다시 시도
      const timer = setTimeout(() => {
        const container = scrollContainerRef.current;
        if (container) {
          const scrollTop = container.scrollTop;
          setIsGrayscale(scrollTop < 10);
        }
      }, 100);
      return () => clearTimeout(timer);
    }

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      
      // 스크롤 위치가 10px 미만이면 흑백, 10px 이상이면 컬러
      const shouldBeGrayscale = scrollTop < 10;
      setIsGrayscale(shouldBeGrayscale);
    };

    // 초기 상태 확인
    handleScroll();
    
    // 스크롤 컨테이너에 이벤트 리스너 추가
    scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      scrollContainer.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      {/* 모바일 전용 스타일 - 기존 PC 코드는 수정하지 않음 */}
      <style dangerouslySetInnerHTML={{__html: `
        @media screen and (max-width: 768px) {
          /* 이미지 스타일일 때 버튼과 아이콘 컨테이너 위치 조정 */
          /* 이미지 다음에 오는 absolute 요소 선택 (일반 스타일의 max-w-4xl은 제외) */
          main div.relative:not([class*="max-w-4xl"]) img ~ div.absolute {
            left: 70% !important;
            top: 70% !important;
            transform: translate(-50%, -50%) !important;
            gap: 1rem !important;
          }
          
          main div.relative:not([class*="max-w-4xl"]) img ~ div.absolute[style*="left: 55%"] {
            left: 75% !important;
            top: 75% !important;
          }
          
          main div.relative:not([class*="max-w-4xl"]) img ~ div.absolute[style*="top: 65%"] {
            top: 70% !important;
          }
          
          main div.relative:not([class*="max-w-4xl"]) img ~ div.absolute[style*="top: 66%"] {
            top: 71% !important;
          }
          
          /* 홈으로 돌아가기 버튼 크기 조정 */
          main div.relative:not([class*="max-w-4xl"]) img ~ div.absolute a {
            padding: 0.375rem 0.75rem !important;
            font-size: 0.65rem !important;
            border-width: 1px !important;
          }
          
          /* 손가락 아이콘과 화살표 아이콘 크기 조정 */
          main div.relative:not([class*="max-w-4xl"]) img ~ div.absolute svg {
            width: 0.75rem !important;
            height: 0.75rem !important;
          }
          
          /* 스크롤 아이콘 컨테이너 gap 조정 */
          main div.relative:not([class*="max-w-4xl"]) img ~ div.absolute > div:last-child {
            gap: 0.0625rem !important;
          }
        }
        
        /* 아이패드 전용 스타일 - PC와 모바일은 건드리지 않음 */
        @media screen and (min-width: 769px) and (max-width: 1024px) {
          /* 이미지 스타일일 때 버튼과 아이콘 컨테이너 위치 조정 - 2% 오른쪽으로 조정 */
          main div.relative:not([class*="max-w-4xl"]) img ~ div.absolute {
            left: 77% !important;
          }
          
          main div.relative:not([class*="max-w-4xl"]) img ~ div.absolute[style*="left: 55%"] {
            left: 82% !important;
          }
        }
      `}} />
      <main className="min-h-screen relative">
        {/* 배경 비디오 */}
        <video
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        style={{ 
          objectFit: 'cover', 
          pointerEvents: 'none',
          filter: isGrayscale ? 'grayscale(100%)' : 'grayscale(0%)',
          transition: 'filter 0.5s ease-in-out',
        }}
        webkit-playsinline="true"
      >
        <source src={`${basePath}/assets/forest.mp4`} type="video/mp4" />
      </video>
      
      {/* 검은색 그라데이션 오버레이 (아주 옅게) */}
      <div 
        className="fixed top-0 left-0 w-full h-full z-10"
        style={{ 
          background: 'linear-gradient(to bottom, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.1) 50%, rgba(0, 0, 0, 0.2) 100%)',
          pointerEvents: 'none'
        }}
      />
      
      <div ref={scrollContainerRef} className="h-screen overflow-y-auto snap-y snap-mandatory relative z-20">
        {/* 첫 번째 페이지: 무드 인트로 섹션 */}
        <div className="min-h-screen flex items-center justify-center p-4 snap-start relative">
          {isImageStyle && style && allImages[style] ? (
            /* 이미지 스타일 (남성 논테토 + 남성 테토 + 여성 에겐): 틀 없이 이미지만 크게 표시 */
            <>
              <div className="w-full flex justify-center items-center relative">
                <img 
                  src={`${basePath}/${allImages[style]}`}
                  alt={styleName}
                  className="w-full max-w-4xl mx-auto h-auto object-contain"
                />
                
                {/* 홈으로 돌아가기 버튼과 스크롤 아이콘 - 절대 위치 (사진 중앙 기준 약간 오른쪽, 조금 아래) */}
                <div 
                  className="absolute flex flex-col items-center gap-4"
                  style={{
                    left: style === 'cleanGirl' ? '55%' : '60%',
                    top: style === 'vampire' ? '65%' : style === 'acubi' ? '66%' : style === 'cleanGirl' ? '73%' : '63%',
                    transform: 'translate(-50%, -50%)',
                  }}
                >
                  {/* 홈으로 돌아가기 버튼 */}
                  <div>
                    <Link
                      href="/"
                      className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-light transition-all border"
                      style={{
                        color: needsWhiteButton ? '#FFFFFF' : '#2C2C2C',
                        borderColor: needsWhiteButton ? '#FFFFFF' : '#2C2C2C',
                        backgroundColor: 'transparent',
                        opacity: 0.7
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.opacity = '1';
                        if (needsWhiteButton) {
                          e.currentTarget.style.backgroundColor = '#FFFFFF';
                          e.currentTarget.style.color = '#2C2C2C';
                        } else {
                          e.currentTarget.style.backgroundColor = '#2C2C2C';
                          e.currentTarget.style.color = '#FDFCF0';
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.opacity = '0.7';
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = needsWhiteButton ? '#FFFFFF' : '#2C2C2C';
                      }}
                    >
                      {lang === 'ko' ? '홈으로 돌아가기' : 'Back to Home'}
                    </Link>
                  </div>
                  
                  {/* 스크롤 유도 아이콘 */}
                  <div className="flex flex-col items-center gap-2 animate-bounce" style={{ color: needsWhiteButton ? '#FFFFFF' : '#2C2C2C', opacity: 0.6 }}>
                    <Hand className="h-6 w-6" />
                    <ChevronDown className="h-5 w-5 -mt-1" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* 일반 스타일: 기존 카드 스타일 */
            <div 
              className="max-w-4xl w-full text-center relative z-10 p-8 sm:p-12 md:p-16"
              style={{
                backgroundColor: 'rgba(253, 252, 240, 0.95)',
                borderRadius: '20px',
                border: '1px solid #EBE9D6',
                boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.15), 0 5px 15px -5px rgba(0, 0, 0, 0.1)',
              }}
            >
              {/* 상단 텍스트: "당신의 추구미는" */}
              <p 
                className="text-lg sm:text-xl mb-4 font-light"
                style={{
                  color: '#2C2C2C',
                  letterSpacing: '0.15em',
                  fontWeight: 300,
                  fontSize: '18px',
                  opacity: 0.7
                }}
              >
                {lang === 'ko' ? '당신의 추구미는' : 'Your style is'}
              </p>
              
              {/* Main Title: 결과 키워드 - 아주 크고 얇은 폰트 */}
              <h1 
                className="text-6xl sm:text-8xl md:text-9xl font-light tracking-tight mb-6"
                style={{
                  color: '#1A1A1A',
                  fontWeight: 300,
                  letterSpacing: '-0.05em'
                }}
              >
                {styleName}
              </h1>
              
              {/* Sub Description: 한 줄 설명 */}
              {aestheticDescription && (
                <p 
                  className="text-lg sm:text-xl md:text-2xl font-light max-w-2xl mx-auto mb-6"
                  style={{
                    color: '#3A3A3A',
                    fontWeight: 300,
                    letterSpacing: '0.01em',
                    lineHeight: 1.6,
                    opacity: 0.85
                  }}
                >
                  {aestheticDescription}
                </p>
              )}
              
              {/* 홈으로 돌아가기 버튼과 스크롤 아이콘 컨테이너 */}
              <div className="mt-16 flex flex-col items-center gap-10">
                {/* 홈으로 돌아가기 버튼 - 작고 심플하게 */}
                <div>
                  <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-light transition-all border"
                    style={{
                      color: '#2C2C2C',
                      borderColor: '#2C2C2C',
                      backgroundColor: 'transparent',
                      opacity: 0.7
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '1';
                      e.currentTarget.style.backgroundColor = '#2C2C2C';
                      e.currentTarget.style.color = '#FDFCF0';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '0.7';
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#2C2C2C';
                    }}
                  >
                    {lang === 'ko' ? '홈으로 돌아가기' : 'Back to Home'}
                  </Link>
                </div>
                
                {/* 스크롤 유도 아이콘 - 손가락 + 화살표 (버튼과 충분한 간격) */}
                <div className="flex flex-col items-center gap-2 animate-bounce" style={{ color: '#2C2C2C', opacity: 0.6 }}>
                  <Hand className="h-6 w-6" />
                  <ChevronDown className="h-5 w-5 -mt-1" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 향수 페이지들 */}
        {fragrances.map((fragrance, idx) => {
          const imageName = fragrance.name;
          const imagePath = `${basePath}/jpg/${imageName}.jpg`;
          const isLast = idx === fragrances.length - 1;
          
          return (
            <div
              key={idx}
              ref={idx === 0 ? firstFragranceRef : null}
              className={`min-h-screen flex items-center justify-center p-4 snap-start relative ${idx === 0 ? 'mt-32' : ''}`}
              style={{ marginTop: idx === 0 ? '120px' : '0' }}
            >
              <div 
                className="max-w-4xl w-full mx-auto rounded-[20px] overflow-hidden transition-all duration-300"
                style={{
                  backgroundColor: 'rgba(253, 252, 240, 0.95)',
                  border: '1px solid #EBE9D6',
                  boxShadow: '0 10px 30px -10px rgba(0, 0, 0, 0.15), 0 5px 15px -5px rgba(0, 0, 0, 0.1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 15px 40px -10px rgba(0, 0, 0, 0.2), 0 8px 20px -5px rgba(0, 0, 0, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 10px 30px -10px rgba(0, 0, 0, 0.15), 0 5px 15px -5px rgba(0, 0, 0, 0.1)';
                }}
              >
                {/* 이미지 - 상단에 꽉 차게 */}
                <div className="w-full">
                  <img 
                    src={imagePath} 
                    alt={fragrance.koreanName}
                    className="w-full h-auto max-h-[60vh] sm:max-h-[75vh] object-cover"
                  />
                </div>
                
                {/* 텍스트 정보 - 하단에 정렬 */}
                <div className="p-6 sm:p-8">
                  <p 
                    className="text-lg sm:text-xl font-medium mb-3"
                    style={{
                      color: '#2C2C2C',
                      opacity: 0.7
                    }}
                  >
                    {lang === 'ko' ? `추천 향수 ${idx + 1}.` : `Recommendation ${idx + 1}.`}
                  </p>
                  <h2 
                    className="text-2xl sm:text-3xl font-bold mb-4"
                    style={{
                      color: '#1A1A1A'
                    }}
                  >
                    {fragrance.koreanName}
                  </h2>
                  <p 
                    className="text-base sm:text-lg leading-relaxed font-normal"
                    style={{
                      color: '#3A3A3A',
                      opacity: 0.85
                    }}
                  >
                    {fragrance.description}
                  </p>
                </div>
              </div>
              
              {/* 마지막 향수가 아닐 때만 스크롤 유도 아이콘 표시 */}
              {!isLast && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce" style={{ color: '#2C2C2C', opacity: 0.6 }}>
                  <Hand className="h-6 w-6" />
                  <ChevronDown className="h-5 w-5" />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </main>
    </>
  );
}

export default function ResultPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </main>
    }>
      <ResultContent />
    </Suspense>
  );
}

