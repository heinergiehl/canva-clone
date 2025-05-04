import {
  Layout,
  Grid,
  Type,
  Crown,
  UploadCloud,
  PenLine,
  Folder,
  Box,
  Sparkles,
  MouseIcon,
  PenLineIcon,
  ShapesIcon,
  LineChartIcon,
  TextIcon,
} from "lucide-react"

export type SidebarTab =
  | "Design"
  | "Elements"
  | "Text"
  | "Brand"
  | "Uploads"
  | "Tools"
  | "Projects"
  | "Apps"
  | "Bulk"
export type ToolTab = "Select" | "Draw" | "Shapes" | "Lines" | "Text"
export type DrawTool = "Pen" | "Marker" | "Highlighter" | "Eraser"
export const drawTools: {
  label: DrawTool
  color: string
  svg: React.ReactNode
}[] = [
  {
    label: "Pen",
    color: "rgb(5, 113, 211)",
    svg: (
      <svg
        width="81"
        height="23"
        viewBox="0 0 81 23"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#_2867099304__a)">
          <path
            d="M76.659 10.483a1.172 1.172 0 0 1 1.004 1.148 1.17 1.17 0 0 1-.992 1.148l-9.14 1.46c-1.608.256-3.068-.964-3.068-2.564 0-1.592 1.444-2.812 3.044-2.568l9.152 1.376Z"
            fill="currentColor"
          />
          <path
            d="m54.575 19.922.007-.003.008-.003 15.347-5.643V8.828L54.47 3.343l-.006-.002-.154-.057c-.257-.095-.562-.207-.807-.373-.26-.175-.472-.422-.541-.78l-1.993.056-.03 19.038h2.022a1.13 1.13 0 0 1 .143-.378c.106-.176.254-.31.414-.42.231-.157.526-.28.802-.395a13.8 13.8 0 0 0 .256-.11Z"
            fill="#fff"
            stroke="url(#_2867099304__b)"
            strokeWidth=".5"
          />
          <path
            d="M4.188 1.788V21.6h36.25V1.788H4.188Z"
            fill="#fff"
            stroke="url(#_2867099304__c)"
            strokeWidth=".5"
          />
          <path
            d="M4.188 1.788V21.6h36.25V1.788H4.188Z"
            stroke="url(#_2867099304__d)"
            strokeWidth=".5"
          />
          <path
            d="m16.25 11.819 6.54-1.688-1.016 3.125 6.413-1.562"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M52.953 1.875v19.6c0 .057-.062.15-.195.15H41.907l11.046-19.75Zm0 0c0-.057-.062-.15-.195-.15H41.907c-.133 0-.196.093-.196.15v19.6c0 .057.063.15.196.15l11.046-19.75Z"
            fill="#fff"
            stroke="url(#_2867099304__e)"
            strokeWidth=".5"
          />
        </g>
        <path d="M42.188 21.875h-2v-20.4h2v20.4Z" fill="currentColor" />
        <defs>
          <linearGradient
            id="_2867099304__b"
            x1="61.188"
            y1="1.875"
            x2="61.188"
            y2="21.475"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EFEFEF" />
            <stop offset=".5" stopColor="#EFEFEF" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="_2867099304__c"
            x1="22.313"
            y1="1.538"
            x2="22.313"
            y2="21.85"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EFEFEF" />
            <stop offset=".5" stopColor="#EFEFEF" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="_2867099304__d"
            x1="22.313"
            y1="1.538"
            x2="22.313"
            y2="21.85"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EFEFEF" />
            <stop offset=".5" stopColor="#EFEFEF" stopOpacity="0" />
          </linearGradient>
          <linearGradient
            id="_2867099304__e"
            x1="46.887"
            y1="1.475"
            x2="46.887"
            y2="21.875"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#EFEFEF" />
            <stop offset=".5" stopColor="#EFEFEF" stopOpacity="0" />
          </linearGradient>
          <filter
            id="_2867099304__a"
            x=".938"
            y=".475"
            width="79.725"
            height="26.4"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              in="SourceAlpha"
              result="effect1_dropShadow_18280_80133"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.341176 0 0 0 0 0.427451 0 0 0 0.3 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_18280_80133"
            />
            <feMorphology
              radius="1"
              operator="dilate"
              in="SourceAlpha"
              result="effect2_dropShadow_18280_80133"
            />
            <feOffset />
            <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.341176 0 0 0 0 0.427451 0 0 0 0.04 0" />
            <feBlend
              in2="effect1_dropShadow_18280_80133"
              result="effect2_dropShadow_18280_80133"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect2_dropShadow_18280_80133"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
  },
  {
    label: "Marker",
    color: "rgb(231, 25, 31)",
    svg: (
      <svg
        width="80"
        height="22"
        viewBox="0 0 80 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#_3396433190__a)">
          <path
            d="M68.275 6.675h-.2v8.4h.2c4.6 0 8.6-1.88 8.6-4.2 0-2.32-4-4.2-8.6-4.2Z"
            fill="currentColor"
          />
          <path
            d="M51.507 1.525H3.25v18.7h48.257a.55.55 0 0 0 .565-.534V2.06a.55.55 0 0 0-.565-.534Z"
            fill="#fff"
            stroke="url(#_3396433190__b)"
            strokeWidth=".5"
          />
          <path d="M41.309 20.475h-2v-19.2h2v19.2Z" fill="currentColor" />
          <mask id="_3396433190__d" fill="#fff">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M63.984 5.775c-1.902-.619-11.996-3.9-12.148-3.9v18l12.062-3.68h4.556c.44 0 .8-.364.8-.817V6.591a.81.81 0 0 0-.8-.816h-4.47Z"
            />
          </mask>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M63.984 5.775c-1.902-.619-11.996-3.9-12.148-3.9v18l12.062-3.68h4.556c.44 0 .8-.364.8-.817V6.591a.81.81 0 0 0-.8-.816h-4.47Z"
            fill="#fff"
            mask="url(#_3396433190__d)"
          />
          <path
            d="M51.836 1.875h-.5v-.5h.5v.5Zm12.148 3.9v.5h-.08l-.075-.025.155-.475Zm-12.148 14.1.146.478-.646.197v-.675h.5Zm12.062-3.68-.146-.479.071-.021h.075v.5Zm4.556 0v-.5.5Zm.8-.817h.5-.5Zm0-8.787h-.5.5Zm-.8-.816v-.5.5Zm-16.618-4.4c.044 0 .08.006.087.007a.677.677 0 0 1 .083.019l.11.03.355.108c.296.092.712.223 1.211.382.999.317 2.335.747 3.725 1.196 2.78.898 5.78 1.873 6.731 2.182l-.309.951c-.95-.31-3.95-1.284-6.73-2.181-1.39-.45-2.724-.878-3.72-1.195a164.778 164.778 0 0 0-1.543-.482 3.5 3.5 0 0 0-.085-.024l-.008-.003.016.004c.003 0 .035.006.077.006v-1Zm-.5 18.5v-18h1v18h-1Zm12.708-3.202-12.062 3.68-.292-.957 12.062-3.68.292.957Zm-.146-.978h4.556v1h-4.556v-1Zm4.556 0c.156 0 .3-.132.3-.317h1c0 .721-.576 1.317-1.3 1.317v-1Zm.3-.317V6.591h1v8.787h-1Zm0-8.787a.311.311 0 0 0-.3-.316v-1c.725 0 1.3.6 1.3 1.316h-1Zm-.3-.316h-4.47v-1h4.47v1Z"
            fill="url(#_3396433190__c)"
          />
        </g>
        <path
          d="m15.781 11.05.544-.01a5 5 0 0 0 2.291-.602l2.398-1.297a.5.5 0 0 1 .682.669l-1.492 2.888a.5.5 0 0 0 .667.677l2.868-1.427a5 5 0 0 1 2.227-.523h.784"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
        <defs>
          <linearGradient
            id="_3396433190__b"
            x1="47.575"
            y1="20.475"
            x2="47.575"
            y2="1.275"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".49" stopColor="#EFEFEF" stopOpacity="0" />
            <stop offset="1" stopColor="#EFEFEF" />
          </linearGradient>
          <linearGradient
            id="_3396433190__c"
            x1="66.335"
            y1="16.088"
            x2="66.335"
            y2="5.881"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".49" stopColor="#EFEFEF" stopOpacity="0" />
            <stop offset="1" stopColor="#EFEFEF" />
          </linearGradient>
          <filter
            id="_3396433190__a"
            x="0"
            y=".275"
            width="79.875"
            height="25.2"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              in="SourceAlpha"
              result="effect1_dropShadow_18280_80118"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.341176 0 0 0 0 0.427451 0 0 0 0.3 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_18280_80118"
            />
            <feMorphology
              radius="1"
              operator="dilate"
              in="SourceAlpha"
              result="effect2_dropShadow_18280_80118"
            />
            <feOffset />
            <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.341176 0 0 0 0 0.427451 0 0 0 0.04 0" />
            <feBlend
              in2="effect1_dropShadow_18280_80118"
              result="effect2_dropShadow_18280_80118"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect2_dropShadow_18280_80118"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
  },
  {
    label: "Highlighter",
    color: "rgb(255, 242, 52)",
    svg: (
      <svg
        width="81"
        height="22"
        viewBox="0 0 81 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#_4290814143__a)" filter="url(#_4290814143__b)">
          <path
            d="M74.469 14.714c.182 0 .34-.117.389-.286l2.202-7.445a.394.394 0 0 0-.39-.497h-7.574v8.228h5.373Z"
            fill="currentColor"
          />
          <path
            d="m53.05 1.302.003.002 3.824 2.468c1.03.666 2.545 1.168 4.092 1.504 1.551.337 3.156.511 4.376.511h3.406c.341 0 .609.269.609.581v8.464c0 .312-.268.58-.609.58h-3.406c-1.218 0-2.823.175-4.374.512-1.547.336-3.064.838-4.094 1.504L53.05 1.302Zm0 0a.614.614 0 0 0-.337-.1H3.453v18.795h49.26a.624.624 0 0 0 .34-.1l3.824-2.47L53.05 1.303Z"
            fill="#fff"
            stroke="url(#_4290814143__c)"
            strokeWidth=".406"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m20.133 10.363-3.81 1.818-1.292-2.707 6.438-3.072 2.123 1.614-.51 2.896 3.729-1.68 1.232 2.736-6.312 2.843-2.094-1.627.496-2.82Z"
            fill="currentColor"
          />
          <path d="M41.625 20.2h-2V1h2v19.2Z" fill="currentColor" />
        </g>
        <defs>
          <linearGradient
            id="_4290814143__c"
            x1="36.406"
            y1="20.2"
            x2="36.406"
            y2="1"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset=".49" stopColor="#EFEFEF" stopOpacity="0" />
            <stop offset="1" stopColor="#EFEFEF" />
          </linearGradient>
          <clipPath id="_4290814143__a">
            <path
              fill="#fff"
              transform="matrix(1 0 0 -1 3 21.275)"
              d="M0 0h74.207v20.275H0z"
            />
          </clipPath>
          <filter
            id="_4290814143__b"
            x="0"
            y="0"
            width="80.207"
            height="26.275"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              in="SourceAlpha"
              result="effect1_dropShadow_18280_80112"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.341176 0 0 0 0 0.427451 0 0 0 0.3 0" />
            <feBlend
              in2="BackgroundImageFix"
              result="effect1_dropShadow_18280_80112"
            />
            <feMorphology
              radius="1"
              operator="dilate"
              in="SourceAlpha"
              result="effect2_dropShadow_18280_80112"
            />
            <feOffset />
            <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.341176 0 0 0 0 0.427451 0 0 0 0.04 0" />
            <feBlend
              in2="effect1_dropShadow_18280_80112"
              result="effect2_dropShadow_18280_80112"
            />
            <feBlend
              in="SourceGraphic"
              in2="effect2_dropShadow_18280_80112"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    ),
  },
  {
    label: "Eraser",
    color: "rgb(255, 255, 255)",
    svg: (
      <svg
        width="81"
        height="22"
        viewBox="0 0 81 22"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g filter="url(#_4206229758__a)">
          <g filter="url(#_4206229758__b)">
            <path
              d="M75.324 19.654a2 2 0 0 0 1.864-1.995V4.123a2 2 0 0 0-1.864-1.995l-15.12-1.037H3v19.6h57.203l15.121-1.037Z"
              fill="#FF9EAD"
            />
          </g>
          <g style={{ mixBlendMode: "multiply", opacity: 0.5 }}>
            <path
              d="M75.324 19.654a2 2 0 0 0 1.864-1.995V4.123a2 2 0 0 0-1.864-1.995L60.188 1.091v19.6h15.136v-1.037Z"
              fill="#8CC8FF"
            />
            <path
              d="M75.324 19.654a2 2 0 0 0 1.864-1.995V4.123a2 2 0 0 0-1.864-1.995L60.188 1.091v19.6h15.136v-1.037Z"
              fill="#FC7C90"
            />
          </g>
          <path d="M70.25 20.001V1.776l-2-.27v18.771h2v-.276Z" fill="#fff" />
        </g>
        <defs>
          <filter
            id="_4206229758__a"
            x="0"
            y=".091"
            width="80.188"
            height="25.6"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feMorphology
              radius="1"
              in="SourceAlpha"
              result="effect1_dropShadow"
            />
            <feOffset dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feColorMatrix values="0 0 0 0 0.25098 0 0 0 0 0.341176 0 0 0 0 0.427451 0 0 0 0.3 0" />
            <feBlend in2="BackgroundImageFix" result="effect1_dropShadow" />
            <feBlend in="SourceGraphic" in2="effect1_dropShadow" />
          </filter>
          <filter
            id="_4206229758__b"
            x="3"
            y="1.091"
            width="74.188"
            height="19.6"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feBlend in="SourceGraphic" in2="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="1.8" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix values="0 0 0 0 0.988235 0 0 0 0 0.486275 0 0 0 0 0.564706 0 0 0 1 0" />
            <feBlend in2="shape" result="effect1_innerShadow" />
          </filter>
        </defs>
      </svg>
    ),
  },
]
/** ─── SIDEBAR TABS ─────────────────────────────────────── */
export const sidebarItems: { label: SidebarTab; icon: any }[] = [
  { label: "Design", icon: Layout },
  { label: "Elements", icon: Grid },
  { label: "Text", icon: Type },
  { label: "Brand", icon: Crown },
  { label: "Uploads", icon: UploadCloud },
  { label: "Tools", icon: PenLine },
  { label: "Projects", icon: Folder },
  { label: "Apps", icon: Box },
  { label: "Bulk", icon: Sparkles },
]

/** ─── TOOL PANEL BUTTONS ─────────────────────────────── */
export const toolItems: { label: ToolTab; icon: any }[] = [
  { label: "Select", icon: MouseIcon },
  { label: "Draw", icon: PenLineIcon },
  { label: "Shapes", icon: ShapesIcon },
  { label: "Lines", icon: LineChartIcon },
  { label: "Text", icon: TextIcon },
]
