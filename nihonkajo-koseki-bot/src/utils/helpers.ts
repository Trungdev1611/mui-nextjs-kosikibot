import { jwtDecode } from 'jwt-decode';
import { NextRequest } from 'next/server';

export function formatDate(
  dateString: string,
  includeTime: boolean = false,
): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    return ''
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  if (includeTime) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  }

  return `${year}/${month}/${day}`;
}

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const maxAge = (token: string) => {
  const tokenDecode: { exp: number } = jwtDecode(token);

  return tokenDecode.exp - Math.ceil(Date.now() / 1000);
};

export const getCookieEdge = (req: NextRequest, key: string) => {
  const cookie = req.cookies.get(key);

  return JSON.parse(cookie?.value || '{}');
};


export function CreateFakeData(numberOf: number, objectDataExam: object) {
  return Array.from({ length: numberOf }, (_, index) => ({
    ...objectDataExam,
    key: index + 1,
    id: index + 1,
  }))
}
