'use client'

import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  linkTo?: string
}

export function Logo({ size = 'md', linkTo }: LogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-12',
    xl: 'h-20',
  }

  const dimensions = {
    sm: { width: 120, height: 32 },
    md: { width: 160, height: 40 },
    lg: { width: 200, height: 48 },
    xl: { width: 240, height: 60 },
  }

  const logo = (
    <Image
      src="/logo.png"
      alt="PredictionXpert"
      width={dimensions[size].width}
      height={dimensions[size].height}
      className={`${sizes[size]} w-auto`}
      priority
    />
  )

  if (linkTo) {
    return <Link href={linkTo}>{logo}</Link>
  }

  return logo
}
