import { broadcastMessageToClient } from "../../index";

export class ProgressReporter {
	// constructor(private taskId: string) { }

	report(progress: number, message?: string) {
		broadcastMessageToClient({
			// taskId: this.taskId,
			progress,
			message,
		})
	}
}