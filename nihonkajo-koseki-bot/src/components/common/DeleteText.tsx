import React from 'react';

interface DeleteTextProps {
    handleDelete: () => void;
    isShow: boolean;
}

export default function DeleteText(props: DeleteTextProps) {
    const { handleDelete, isShow } = props;

    return (<div className='flex justify-end pr-10'>
        {isShow ?
            <span
                className='text-sm font-bold text-[#4D4D4D] cursor-pointer border-b border-[#848383]'
                onClick={handleDelete}>
                組織を削除する
            </span>
            :
            null}

    </div>
    )


}