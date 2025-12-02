import { tuyau } from '@/tuyau'

function getToken() {
  const token = localStorage.getItem('auth-token')
  if (!token) throw new Error('No auth token')
  return token
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export async function getProfile() {
  try {
    const token = getToken()
    const res = await tuyau.profile.edit.$get({
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res.data
  } catch (error) {
    return null
  }
}

export async function updateProfile(data: { fullName: string }) {
  const token = getToken()
  await sleep(5000)
  const res = await tuyau.profiles.$put(data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return res.data
}
