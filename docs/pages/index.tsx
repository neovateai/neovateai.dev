import { useRouter } from 'next/router';

function Navbar() {
  const router = useRouter();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#0a0a0a',
        padding: '8px 0 0',
      }}
    >
      <nav
        style={{
          width: '1160px',
          height: '68px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          backgroundColor: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderTop: 'none',
          borderRadius: '6px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 'bold',
              fontSize: '18px',
              color: '#000',
            }}
          >
            N
          </div>
          <span
            style={{
              color: '#fff',
              fontSize: '20px',
              fontWeight: '600',
              letterSpacing: '0.05em',
            }}
          >
            NEOVATE
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '48px' }}>
          <a
            onClick={(e) => {
              e.preventDefault();
              router.push('/en/docs/overview');
            }}
            style={{
              color: '#fff',
              fontSize: '14px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#999')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
          >
            Documentation
          </a>

          <a
            href="#"
            style={{
              color: '#fff',
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#999')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
          >
            Changelog
          </a>
        </div>
      </nav>
    </div>
  );
}

function Hero() {
  const router = useRouter();

  return (
    <div
      style={{
        height: '620px',
        marginTop: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `
        radial-gradient(ellipse at 20% 50%, rgba(222, 32, 91, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 50%, rgba(138, 43, 226, 0.2) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 100%, rgba(222, 32, 91, 0.4) 0%, transparent 40%),
        linear-gradient(180deg, 
          #0a0a0a 0%, 
          #1a0e1a 15%,
          #2d1028 30%,
          #4a1845 50%,
          #6b2157 70%,
          #3d0d20 90%,
          #1a0a10 100%)
      `,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          zIndex: 10,
          padding: '0 20px',
        }}
      >
        <h1
          style={{
            fontSize: '64px',
            fontWeight: '700',
            color: '#fff',
            marginBottom: '0',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
          }}
        >
          Code with Agent
          <span
            style={{
              position: 'relative',
              display: 'inline-block',
            }}
          >
            s
            <span
              style={{
                position: 'absolute',
                top: '-8px',
                right: '-24px',
                width: '20px',
                height: '20px',
                backgroundColor: '#DE205B',
                borderRadius: '50%',
                boxShadow: '0 0 20px rgba(222, 32, 91, 0.5)',
              }}
            ></span>
          </span>
        </h1>
        <h2
          style={{
            fontSize: '64px',
            fontWeight: '700',
            color: '#fff',
            margin: '0 0 40px 0',
            lineHeight: '1.2',
            letterSpacing: '-0.02em',
          }}
        >
          Build with Neovate
        </h2>
        <p
          style={{
            fontSize: '32px',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: '0',
            fontWeight: '400',
            letterSpacing: '0.1em',
          }}
        >
          智能协同，创予新生
        </p>
        <button
          onClick={() => router.push('/en/docs/overview')}
          style={{
            marginTop: '48px',
            background: 'linear-gradient(90deg, #DE205B 0%, #E94560 100%)',
            border: 'none',
            padding: '16px 48px',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '18px',
            fontWeight: '600',
            color: '#fff',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(222, 32, 91, 0.3)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow =
              '0 6px 20px rgba(222, 32, 91, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 4px 15px rgba(222, 32, 91, 0.3)';
          }}
        >
          Getting Started
        </button>
      </div>

      {/* Particle effects */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        {/* Generate random particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              backgroundColor:
                Math.random() > 0.5 ? '#fff' : 'rgba(222, 32, 91, 0.8)',
              borderRadius: '50%',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px ${Math.random() > 0.5 ? 'rgba(255, 255, 255' : 'rgba(222, 32, 91'}, ${Math.random() * 0.3 + 0.1})`,
              animation: `float ${Math.random() * 10 + 10}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Gradient overlay for depth */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
          radial-gradient(circle at 30% 30%, rgba(222, 32, 91, 0.15) 0%, transparent 40%),
          radial-gradient(circle at 70% 70%, rgba(138, 43, 226, 0.1) 0%, transparent 40%),
          radial-gradient(circle at 50% 50%, transparent 30%, rgba(0,0,0,0.3) 100%)
        `,
          pointerEvents: 'none',
        }}
      ></div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          25% {
            transform: translateY(-20px) translateX(10px);
          }
          50% {
            transform: translateY(10px) translateX(-10px);
          }
          75% {
            transform: translateY(-10px) translateX(20px);
          }
        }
      `}</style>
    </div>
  );
}

function GettingStarted() {
  const router = useRouter();

  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#0a0a0a',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '80px 0',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Simple dot background pattern */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0, 20px 20px',
          pointerEvents: 'none',
        }}
      ></div>

      <div
        style={{
          width: '1160px',
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '56px',
              fontWeight: '700',
              color: '#fff',
              margin: '0 0 16px 0',
              letterSpacing: '-0.02em',
            }}
          >
            Neovate
          </h2>
          <p
            style={{
              fontSize: '36px',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: 0,
              fontWeight: '500',
              letterSpacing: '0.05em',
            }}
          >
            先一步全新体验
          </p>
        </div>

        <button
          onClick={() => router.push('/en/docs/overview')}
          style={{
            background: 'linear-gradient(90deg, #DE205B 0%, #E94560 100%)',
            border: 'none',
            padding: '20px 30px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            width: '380px',
            position: 'relative',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(222, 32, 91, 0.3)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow =
              '0 6px 20px rgba(222, 32, 91, 0.4)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 4px 15px rgba(222, 32, 91, 0.3)';
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flex: 1,
            }}
          >
            <span
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#000',
              }}
            >
              免费开始使用
            </span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#000',
              }}
            >
              NEW EXPERIENCE
            </span>
          </div>
          <span
            style={{
              fontSize: '24px',
              color: '#000',
              fontWeight: '700',
              position: 'absolute',
              right: '30px',
            }}
          >
            →
          </span>
        </button>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div
      style={{
        width: '100%',
        backgroundColor: '#0a0a0a',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '60px 0 40px',
        color: '#fff',
      }}
    >
      <div
        style={{
          width: '1160px',
          margin: '0 auto',
          padding: '0 20px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '60px',
            marginBottom: '60px',
          }}
        >
          {/* Company Info */}
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '20px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: '#000',
                }}
              >
                N
              </div>
            </div>
            <p
              style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.6)',
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              建立前端智能协同研发新范式，Neovate 集成先进
              <br />
              的大型语言模型 (LLM) 来提速开发工作流。
            </p>
          </div>

          {/* Products */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '24px',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              产品
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '16px' }}>
                <a
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')
                  }
                >
                  定价方案
                </a>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <a
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')
                  }
                >
                  使用文档
                </a>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <a
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')
                  }
                >
                  更新日志
                </a>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '24px',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              公司
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '16px' }}>
                <a
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')
                  }
                >
                  联系我们
                </a>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <a
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')
                  }
                >
                  服务条款
                </a>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <a
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')
                  }
                >
                  隐私政策
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3
              style={{
                fontSize: '16px',
                fontWeight: '500',
                marginBottom: '24px',
                color: 'rgba(255, 255, 255, 0.8)',
              }}
            >
              资源
            </h3>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              <li style={{ marginBottom: '16px' }}>
                <a
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')
                  }
                >
                  技术博客
                </a>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <a
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')
                  }
                >
                  最佳实践
                </a>
              </li>
              <li style={{ marginBottom: '16px' }}>
                <a
                  href="#"
                  style={{
                    color: 'rgba(255, 255, 255, 0.6)',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseOut={(e) =>
                    (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.6)')
                  }
                >
                  API 文档
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div
          style={{
            paddingTop: '30px',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            color: 'rgba(255, 255, 255, 0.4)',
            fontSize: '14px',
          }}
        >
          © 2025 Neovate. 保留所有权利。
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        margin: 0,
        padding: 0,
      }}
    >
      {/* WIP Banner */}
      <div
        style={{
          background: 'linear-gradient(90deg, #DE205B 0%, #E94560 50%, #DE205B 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradient 3s ease infinite',
          padding: '12px 0',
          textAlign: 'center',
          fontSize: '14px',
          fontWeight: '600',
          color: '#fff',
          letterSpacing: '0.05em',
          borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        }}
      >
        🚧 WIP - This site is under construction 🚧
      </div>
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
      `}</style>
      <Navbar />
      <Hero />
      <GettingStarted />
      <Footer />
    </div>
  );
}
