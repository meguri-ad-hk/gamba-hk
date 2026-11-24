#!/usr/bin/env python3
"""Prepare a GAMBA website work/service photo in the approved 16:9 format.

Usage:
  python tools/prepare_image.py input.jpg assets/images/services/service-digital-marketing-01.webp
  python tools/prepare_image.py input.jpg output.webp --mode crop --focus-x 0.65

Output is 1600x900 WebP by default; smaller input photos are not artificially upscaled.
For extreme vertical/square source, auto chooses an uncropped image on soft extended background.
Review the result visually before deploying; important subjects/text need manual art direction.
"""
import argparse
from pathlib import Path
from PIL import Image, ImageOps, ImageFilter, ImageEnhance

def create(inp, out, mode='auto', width=1600, focus_x=.5, focus_y=.5):
    im=ImageOps.exif_transpose(Image.open(inp)).convert('RGB')
    target_ratio=16/9
    ratio=im.width/im.height
    fraction=min(ratio/target_ratio,target_ratio/ratio)
    if mode=='auto':mode='crop' if fraction>=.82 else 'contain'
    w=min(width,im.width) if ratio>1.2 else min(width,1600)
    if w%16:w=w//16*16
    w=max(320,w)
    h=round(w*9/16)
    if mode=='crop':
        res=ImageOps.fit(im,(w,h),method=Image.Resampling.LANCZOS,centering=(focus_x,focus_y))
    else:
        bg=ImageOps.fit(im,(w,h),method=Image.Resampling.LANCZOS).filter(ImageFilter.GaussianBlur(max(18,w//32)))
        bg=ImageEnhance.Brightness(bg).enhance(.8)
        fg=ImageOps.contain(im,(round(w*.83),round(h*.9)),method=Image.Resampling.LANCZOS)
        bg.paste(fg,((w-fg.width)//2,(h-fg.height)//2))
        res=bg
    out=Path(out);out.parent.mkdir(parents=True,exist_ok=True)
    res.save(out,'WEBP',quality=86,method=6)
    print(f'{inp} -> {out} ({res.width}x{res.height}, mode={mode})')

if __name__=='__main__':
    ap=argparse.ArgumentParser();ap.add_argument('input');ap.add_argument('output')
    ap.add_argument('--mode',choices=['auto','crop','contain'],default='auto')
    ap.add_argument('--width',type=int,default=1600)
    ap.add_argument('--focus-x',type=float,default=.5);ap.add_argument('--focus-y',type=float,default=.5)
    args=ap.parse_args();create(args.input,args.output,args.mode,args.width,args.focus_x,args.focus_y)
