import type { Directory } from "@/utils/directory";
import { search } from "@inquirer/prompts";

/**
 * Asynchronously prompts the user to select a project from the available list.
 *
 * @param projects - An array of available project names.
 * @returns A promise that resolves to the selected project name.
 *
 * @throws If there is an issue with the user prompt.
 *
 * @example
 * // Usage example:
 * const projects = ["project1", "project2", ...];
 * const selectedProject = await promptToSelectProject(projects);
 * console.log(selectedProject); // 'project1' or 'project2'
 */
export async function promptToSelectProject(projects: Directory[]): Promise<{
	project: string;
}> {
	const project = await search({
		message: "Select a project to copy .env files",
		source: async (input) => {
			if (!input) {
				return projects;
			}

			return projects.filter((project) =>
				project.value.toLocaleLowerCase().includes(input.toLowerCase()),
			);
		},
	});

	return { project };
}
