import React from 'react'
import Button from '@/components/Button';
import { useRouter } from 'next/router';

interface ButtonGroupFooterProps {
    onSubmit: () => void

}
export default function ButtonGroupFooter(props: ButtonGroupFooterProps) {
    const router = useRouter();


  return (
    <div className="flex justify-center gap-[10px] p-5 w-full mt-9 bg-[#C8D0DA] border-l border-l-gray-light">
    <Button
      text="戻る"
      size="medium"
      className="px-8"
      fullWidth
      onClick={() => router.back()}
    />
    <Button
      type="submit"
      text="保存"
      variant="primary"
      size="medium"
      className="px-8"
      fullWidth
      onClick={props.onSubmit}
    />
  </div>
  )
}
