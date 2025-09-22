import SuperCard from "@/components/SuperCard";
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

function Navbar() {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        padding: '8px 0 0',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        transition: 'background-color 0.3s ease',
        backgroundColor: isScrolled ? '#000' : 'transparent',
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
          borderTop: 'none',
          borderRadius: '6px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src="/logotext.svg" alt="NEOVATE LOGO" />
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
            文档
          </a>

          <a
            href="https://github.com/neovateai/neovate-code/blob/master/CHANGELOG.md"
            target="_blank"
            style={{
              color: '#fff',
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#999')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
          >
            更新日志
          </a>
          <a
            href="https://github.com/neovateai/neovate-code"
            target="_blank"
            style={{
              color: '#fff',
              fontSize: '14px',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
            onMouseOver={(e) => (e.currentTarget.style.color = '#999')}
            onMouseOut={(e) => (e.currentTarget.style.color = '#fff')}
          >
            <img src="/github.svg" alt="github logo" />
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
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url(https://mdn.alipayobjects.com/huamei_39mb2c/afts/img/A*ZV4OTrrh120AAAAATtAAAAgAeobkAQ/original)',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
      }}
    >
      <img style={{
        position: 'absolute',
        inset: 0,
        zIndex: 1,
        height: '100vh'
      }} src="https://mdn.alipayobjects.com/huamei_39mb2c/afts/img/A*hpceRa2rOpYAAAAAWbAAAAgAeobkAQ/original" />
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '207px',
          position: 'relative',
          zIndex: 1
        }}
      >
        <img style={{
          width: '880px',
          height: '52px'
        }} src="/slogant.svg" />
        <img style={{
          width: '948px',
          height: '52px',
          marginTop: '19px'
        }} src="/sloganb.svg" />
        <p
          style={{
            color: 'rgba(166, 170, 181, 0.85)',
            fontSize: '48px',
            fontWeight: 600,
            lineHeight: '67px',
            marginTop: '32px'
          }}
        >
          智能协同，创予新生
        </p>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          width: '294px',
          height: '96px',
          marginTop: '208px'
        }}>
          <button
            onClick={() => router.push('/en/docs/overview')}
            style={{
              marginTop: '48px',
              background: 'rgba(254, 48, 112, 0.8)',
              border: 'none',
              padding: '16px 48px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '18px',
              fontWeight: '500',
              color: '#000',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 15px rgba(254, 48, 112, 0.3)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 6px 20px rgba(254, 48, 112, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow =
                '0 4px 15px rgba(254, 48, 112, 0.3)';
            }}
          >
            开始体验
          </button>
          <p style={{
            fontSize: '16px',
            lineHeight: '22px',
            textAlign: 'center',
            marginTop: '24px',
            color: 'rgba(255, 255, 255, 0.65)'
          }}>
            前端智能协同研发工具链
          </p>
        </div>
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
              zIndex: 2,
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

function Introducing() {
  return (
    <div style={{
      height: 932,
      background: '#000000'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '85px',
        paddingBottom: '40px'
      }}>
        <p style={{
          fontWeight: 500,
          fontSize: '20px',
          color: '#FF3070',
          lineHeight: '28px'
        }}>INTRODUCING</p>
        <p style={{
          fontSize: '48px',
          lineHeight: '67px',
          color: '#FFFFFF',
          fontWeight: "600",
          marginTop: '7px'
        }}>选择高度智能的开发体验</p>
      </div>
      <SuperCard
        startColor="#FF3070"
        endColor="#FF3070"
        opacity={1}
        dataSources={[1]}
        renderItem={() => (
          <div style={{
            width: '1122px',
            height: '623px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            //边框渐变
            background: `linear-gradient(0deg, #FF3070 0%, #000000 100%)`
          }}>
            <div style={{
              width: '1118px',
              height: '619px',
              borderRadius: '8px',
              background: '#000000',
              position: 'relative'
            }}>
              <div style={{
                width: '1072px',
                height: '499px',
                backgroundImage: 'url(https://mdn.alipayobjects.com/huamei_39mb2c/afts/img/A*LzReQZ4fOIwAAAAASdAAAAgAeobkAQ/original)',
                backgroundSize: '100% 100%',
                backgroundRepeat: 'no-repeat',
                position: 'absolute',
                bottom: '25px',
                left: '21px'
              }}>
              </div>
              <div style={{
                width: '1072px',
                height: '509px',
                background: 'radial-gradient(ellipse 86% 83% at 50% 62%, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 100%)',
                position: 'absolute',
                bottom: '14px',
                left: '7px'
              }}></div>
              <div style={{
                position: 'absolute',
                width: '1072px',
                height: '499px',
                bottom: '25px',
                left: '21px',
              }}>
                <video style={{
                  width: '1072px',
                  height: '499px',
                }} src=""></video>
                <div id="playBtn" style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  cursor: 'pointer'
                }}
                  onClick={(e) => {
                    const video = document.querySelector('video')
                    const currentTarget = e.currentTarget
                    if (video) {
                      video.onpause = () => {
                        currentTarget.style.display = 'block'
                      }
                      video.onended = () => {
                        currentTarget.style.display = 'block'
                      }
                      video.play()
                      currentTarget.style.display = 'none'
                    }
                  }}
                >
                  <svg width="45px" height="45px" viewBox="0 0 45 45" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <title>三角形</title>
                    <g id="官网" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.99">
                      <g id="NEOVATE-首页" fillRule="nonzero" transform="translate(-922, -1483)" fill="#FFFFFF">
                        <polygon id="三角形" fillRule="evenodd" opacity="0.172363281" transform="translate(944.5, 1505.5) rotate(-270) translate(-944.5, -1505.5)" points="944.5 1483 967 1528 922 1528"></polygon>
                      </g>
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        )} />
    </div >
  )
}

function Module() {
  return (
    <div style={{
      background: '#000000',
      paddingBottom: '51px'
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: '85px',
        paddingBottom: '40px',
        background: 'radial-gradient(ellipse 50% 82% at 49% 100%, rgba(215, 40, 94, 0.56) 0%, rgba(21, 20, 29, 0.05) 53%, rgba(0, 0, 0, 0) 100%)'
      }}>
        <p style={{
          fontWeight: 500,
          fontSize: '20px',
          color: '#FF3070',
          lineHeight: '28px'
        }}>MODULE</p>
        <p style={{
          fontSize: '48px',
          lineHeight: '67px',
          color: '#FFFFFF',
          fontWeight: "600",
          marginTop: '7px'
        }}>为你解锁全新可能</p>
      </div>
      <div style={{
        width: '1122px',
        margin: 'auto',
      }}>
        <div style={{
          marginTop: '40px'
        }}>
          <SuperCard
            startColor="#FF3070"
            endColor="#FF3070"
            opacity={1}
            dataSources={[1]}
            renderItem={() => (
              <div style={{
                width: '1122px',
                height: '824px',
              }}>
                <img style={{
                  width: '1039px',
                  height: '524px',
                  margin: '40px auto 0',
                }} src="https://mdn.alipayobjects.com/huamei_wo6vpv/afts/img/A*4DVgRosdwXkAAAAAU5AAAAgAevnUAQ/original" />
                <div style={{
                  display: 'flex',
                  overflow: 'hidden',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '1039px',
                  height: '229px'
                }}>
                  <span style={{
                    marginTop: '13px',
                    fontFamily: 'BM Dohyeon',
                    fontSize: '14px',
                    color: '#FF3070',
                    lineHeight: '17px',
                  }}>「 01 」</span>
                  <span style={{
                    marginTop: '10px',
                    fontSize: '24px',
                    fontWeight: '600',
                    color: '#FFFFFF',
                    lineHeight: '37px',
                  }}>插件系统</span>
                  <div style={{
                    width: '605px',
                    fontSize: '16px',
                    lineHeight: '22px',
                    color: '#A6AAB5',
                    textAlign: 'center',
                    marginTop: '28px'
                  }}>简单任务直接输入、复杂任务先按「shift + tab」进入 Plan 模式, 确认后在让 AI 执行, 可提升效率和效果。</div>
                </div>
              </div>
            )}
          />
        </div>
        <div style={{
          marginTop: '20px',
          display: 'flex',
          gap: '20px'
        }}>
          <div style={{
            flex: '1',
          }}>
            <SuperCard
              startColor="#FF3070"
              endColor="#FF3070"
              opacity={1}
              dataSources={[1]}
              renderItem={() => (
                <div style={{
                  width: '551px',
                  height: '498px',
                }}>
                  <div style={{
                    width: '479px',
                    margin: '32px auto 0'
                  }}>
                    <div style={{
                      display: 'flex'
                    }}>
                      <span style={{
                        fontSize: '26px',
                        lineHeight: '37px',
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>计划模式</span>
                      <span style={{
                        marginLeft: '14px',
                        fontSize: '14px',
                        lineHeight: '17px',
                        color: '#FF3070',
                        fontFamily: 'BM Dohyeon',
                        marginTop: '20px'
                      }}>「 02 」</span>
                    </div>
                    <span style={{
                      width: '422px',
                      display: 'block',
                      color: '#A6AAB5',
                      fontSize: '16px',
                      lineHeight: '22px',
                      marginTop: '33px'
                    }}>推荐你在 VS Code 或 Cursor 里执行 NeoCoder。此时，它会自动安装一个 VS Code 的 Extension，用于获取编辑器相关的信息，包含当前打开的文件、行列、错误等。</span>
                    <img style={{
                      marginTop: '57px'
                    }} src="https://mdn.alipayobjects.com/huamei_wo6vpv/afts/img/A*LMaiQa7Bg58AAAAAQRAAAAgAevnUAQ/original" />
                  </div>
                </div>
              )}
            />
          </div>
          <div style={{
            flex: '1',
          }}>
            <SuperCard
              startColor="#FF3070"
              endColor="#FF3070"
              opacity={1}
              dataSources={[1]}
              renderItem={() => (
                <div style={{
                  width: '551px',
                  height: '498px',
                }}>
                  <div style={{
                    width: '479px',
                    margin: '32px auto 0'
                  }}>
                    <div style={{
                      display: 'flex'
                    }}>
                      <span style={{
                        fontSize: '26px',
                        lineHeight: '37px',
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>Todos</span>
                      <span style={{
                        marginLeft: '14px',
                        fontSize: '14px',
                        lineHeight: '17px',
                        color: '#FF3070',
                        fontFamily: 'BM Dohyeon',
                        marginTop: '20px'
                      }}>「 03 」</span>
                    </div>
                    <span style={{
                      width: '422px',
                      display: 'block',
                      color: '#A6AAB5',
                      fontSize: '16px',
                      lineHeight: '22px',
                      marginTop: '33px'
                    }}>推荐你在 VS Code 或 Cursor 里执行 NeoCoder。此时，它会自动安装一个 VS Code 的 Extension，用于获取编辑器相关的信息，包含当前打开的文件、行列、错误等。</span>
                    <img style={{
                      marginTop: '57px'
                    }} src="https://mdn.alipayobjects.com/huamei_wo6vpv/afts/img/A*uC1BTKncUMcAAAAARQAAAAgAevnUAQ/original" />
                  </div>
                </div>
              )}
            />
          </div>
        </div>
        <div style={{
          width: '1122px',
          margin: 'auto',
        }}>
          <div style={{
            marginTop: '20px'
          }}>
            <SuperCard
              startColor="#FF3070"
              endColor="#FF3070"
              opacity={1}
              dataSources={[1]}
              renderItem={() => (
                <div style={{
                  width: '1122px',
                  height: '498px',
                  display: 'flex',
                  backgroundImage: 'url(https://mdn.alipayobjects.com/huamei_wo6vpv/afts/img/A*7N13S6_lkqwAAAAAYTAAAAgAevnUAQ/original)',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat'
                }}>
                  <img style={{
                    width: '646px',
                    height: '444px',
                    marginTop: '22px',
                    marginLeft: '34px'
                  }} src="https://mdn.alipayobjects.com/huamei_wo6vpv/afts/img/A*OJwaR5cLrmMAAAAAQvAAAAgAevnUAQ/original" />
                  <div style={{
                    display: 'flex',
                    overflow: 'hidden',
                    flexDirection: 'column',
                    width: '350px',
                    marginLeft: '51px'
                  }}>
                    <div style={{
                      display: 'flex',
                      marginTop: '153px'
                    }}>
                      <span style={{
                        fontSize: '26px',
                        lineHeight: '37px',
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>定制</span>
                      <span style={{
                        marginLeft: '8px',
                        fontSize: '14px',
                        lineHeight: '17px',
                        color: '#FF3070',
                        fontFamily: 'BM Dohyeon',
                        marginTop: '18px'
                      }}>「 04 」</span>
                    </div>
                    <div style={{
                      display: 'flex',
                      marginTop: '1px'
                    }}>
                      <span style={{
                        fontSize: '26px',
                        lineHeight: '37px',
                        fontWeight: '600',
                        color: '#ffffff'
                      }}>Slash Commands（指令）</span>
                    </div>
                    <div style={{
                      width: '350px',
                      fontSize: '16px',
                      lineHeight: '22px',
                      color: '#A6AAB5',
                      marginTop: '28px'
                    }}>指令的自定义，是在 ./.neocoder/commands 或 ~/.neocoder/commands 下定义的 markdown 文件即自定义子任务，可以用自然语言编写（即 prompt），支持 $ARGUMENTS 传参。</div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

function GettingStarted() {
  const router = useRouter();

  return (
    <div
      className="getting-started"
      style={{
        width: '100%',
        backgroundColor: '#0a0a0a',
        height: '282px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style jsx>
        {`
          .dot-background{
            display: none
          }
          .getting-started:hover .dot-background {
            display: block;
          }
        `}
      </style>
      {/* Simple dot background pattern */}
      <div
        className="dot-background"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `radial-gradient(ellipse 39% 69% at 21% 100%, rgba(215, 40, 94, 0.56) 0%, rgba(21, 20, 29, 0.05) 53%, rgba(0, 0, 0, 0) 100%)`,
          pointerEvents: 'none',
        }}
      ></div>

      <div
        style={{
          width: '1123px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          position: 'relative',
          zIndex: 1,
          paddingTop: '85px'
        }}
      >
        <div>
          <h2
            style={{
              fontSize: '58px',
              fontWeight: '700',
              lineHeight: '81px',
              color: '#fff'
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
            background: 'rgba(255, 48, 112, 1)',
            border: 'none',
            padding: '20px 30px',
            borderRadius: '4px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            width: '380px',
            position: 'relative',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(255, 48, 112, 0.4)',
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow =
              '0 6px 20px rgba(255, 48, 112, 0.6)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow =
              '0 4px 15px rgba(255, 48, 112, 0.4)';
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
              开始体验
            </span>
            <span
              style={{
                fontSize: '16px',
                fontWeight: '700',
                color: '#000',
              }}
            >
              new experience
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
      <div
        style={{
          width: '1123px',
          margin: '0 auto',
          textAlign: 'right',
          marginTop: '18px'
        }}
      >
        <span style={{
          fontWeight: 300,
          fontSize: '14px',
          color: '#4C505A',
          lineHeight: '20px'
        }}>当前仅对外开源 CLI 能力，更多能力模块敬请期待</span>
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
            gridTemplateColumns: '1fr 1fr',
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
                  width: '38px',
                  height: '38px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img src="/logo.svg" alt="Neovate Logo" />
              </div>
            </div>
            <div style={{
              height: 50,
              marginTop: 98
            }}>

              <p
                style={{
                  fontSize: '14px',
                  color: '#5B606C',
                  lineHeight: '20px',
                }}
              >
                建立前端智能协同研发新范式，Neovate 集成先进
                <br />
                的大型语言模型 (LLM) 来提速开发工作流。
              </p>
            </div>
            {/* Copyright */}
            <div
              style={{
                marginTop: '7px',
                height: 28
              }}
            >
              <p style={{
                fontSize: '14px',
                color: '#5B606C',
                lineHeight: '20px',
              }}>
                © 2025 Neovate. 保留所有权利。
              </p>
            </div>
          </div>

          {/* Products */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between'
          }}>
            <div>
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  marginBottom: '24px',
                  color: 'rgba(255, 255, 255, 0.45)',
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
                      color: 'rgba(255, 255, 255, 1)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = 'rgba(255, 255, 255, 1)')
                    }
                  >
                    使用文档
                  </a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <a
                    href="#"
                    style={{
                      color: 'rgba(255, 255, 255, 1)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = 'rgba(255, 255, 255, 1)')
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
                  color: 'rgba(255, 255, 255, 0.45)',
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
                      color: 'rgba(255, 255, 255, 1)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = 'rgba(255, 255, 255, 1)')
                    }
                  >
                    联系我们
                  </a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <a
                    href="#"
                    style={{
                      color: 'rgba(255, 255, 255, 1)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = 'rgba(255, 255, 255, 1)')
                    }
                  >
                    服务条款
                  </a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <a
                    href="#"
                    style={{
                      color: 'rgba(255, 255, 255, 1)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = 'rgba(255, 255, 255, 1)')
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
                  color: 'rgba(255, 255, 255, 0.45)',
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
                      color: 'rgba(255, 255, 255, 1)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = 'rgba(255, 255, 255, 1)')
                    }
                  >
                    技术博客
                  </a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <a
                    href="#"
                    style={{
                      color: 'rgba(255, 255, 255, 1)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = 'rgba(255, 255, 255, 1)')
                    }
                  >
                    最佳实践
                  </a>
                </li>
                <li style={{ marginBottom: '16px' }}>
                  <a
                    href="#"
                    style={{
                      color: 'rgba(255, 255, 255, 1)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
                    onMouseOut={(e) =>
                      (e.currentTarget.style.color = 'rgba(255, 255, 255, 1)')
                    }
                  >
                    API 文档
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PandorasBox() {
  return (
    <div style={{
      height: '334px',
      background: '#ff3070',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundImage: 'url(https://mdn.alipayobjects.com/huamei_39mb2c/afts/img/A*PcdwTJkQhI0AAAAAX5AAAAgAeobkAQ/original)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}>
      <img src="/NEOVATE.svg" alt="NEOVATE" />
    </div>
  )
}

export default function HomePage() {
  const [showPandorasBox, setShowPandorasBox] = useState(false);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingUp = currentScrollY < lastScrollY + 100;
      const isNearBottom = window.innerHeight + currentScrollY >= document.body.offsetHeight - 100;
      if (isScrollingUp && isNearBottom) {
        setShowPandorasBox(true);
      }

      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: '#0a0a0a',
        margin: 0,
        padding: 0,
      }}
    >
      <Hero />
      <Introducing />
      <Module />
      <GettingStarted />
      <Footer />
      {showPandorasBox && <PandorasBox />}
    </div>
  );
}
