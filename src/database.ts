
const DB: any = {
	challenges: [],
	insertChallenge(senderId: string, receiverId: string) {
		DB.challenges.push(senderId)
	}
}
export { DB };
