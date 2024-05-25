import cron from "node-cron";
import { connectDb } from "@/dbConfig/dbConfig";
import { Project } from "@/models/project-model";
import { NextRequest, NextResponse } from "next/server";
import moment from "moment"; // Import the moment library

connectDb();

var ranCount = 0;
const automateClosingInOfProjects = async () => {
  let projectCount = 0;
  try {
    console.log("Scheduled task is going to execute@@@@");

    // ====================logic for closingIn stuff
    const projectsToUpdate = await Project.find(); // Fetching all projects from the database

    // Iterate over each project and update the closingIn based on the new logic
    for (const project of projectsToUpdate) {
      projectCount += 1;
      const { occupancyDate } = project;
      const occupancyDateMoment = moment(occupancyDate);
      const currentTimestamp = moment();
      // console.log("$$$$$$occupancyDateMoment", occupancyDateMoment, random);
      // console.log("currentTimestamp", currentTimestamp);

      const monthsDifference = occupancyDateMoment.diff(
        currentTimestamp,
        "months"
      );

      let closingIn;

      // Set closingIn based on the calculated months difference
      if (occupancyDateMoment < currentTimestamp) {
        closingIn = -1;
      } else if (monthsDifference >= 0 && monthsDifference < 12) {
        closingIn = 12;
      } else if (monthsDifference >= 12 && monthsDifference < 24) {
        closingIn = 1;
      } else if (monthsDifference >= 24 && monthsDifference < 36) {
        closingIn = 2;
      } else if (monthsDifference >= 36 && monthsDifference < 48) {
        closingIn = 3;
      } else if (monthsDifference >= 48 && monthsDifference < 60) {
        closingIn = 4;
      } else if (monthsDifference >= 60 && monthsDifference < 72) {
        closingIn = 5;
      } else {
        // Default value or handle additional cases
        closingIn = 6;
      }

      // Update the project's closingIn in the database
      // console.log("@@@@@Project before update", project._id);
      const updatedProject = await Project.findOneAndUpdate(
        { _id: project._id },
        { $set: { closingIn } },
        {
          new: true,
          select: "_id",
        }
      );
      // console.log("@@@@@Project After update", updatedProject, projectCount);
      // console.log("###############################################");
    }

    // console.log(
    //   "==========================Projects updated successfully via cron@@@",
    //   projectCount,
    //   ++ranCount
    // );
  } catch (error: any) {
    // console.error(projectCount, "Error in scheduled task:", error.message);
    return NextResponse.json(
      { error: error.message },
      { status: error.statusCode || 500 }
    );
  }
};

// ==================for "isLaunchedRecently" and "isUpcomingProject"
const automateStatusUpdateOfProjects = async () => {
  let projectCount = 0;
  ranCount += 1;
  try {
    console.log("automateStatusUpdateOfProjects is going to run");
    const projectsToUpdate = await Project.find(); // Fetching all projects from the database

    // Iterate over each project and update the boolean values based on the releaseDate
    for (const project of projectsToUpdate) {
      projectCount += 1;
      const { releaseDate } = project;
      const releaseDateMoment = moment(releaseDate);
      const currentTimestamp = moment();

      let isLaunchedRecently, isUpcomingProject;

      // Set boolean values based on the releaseDate
      if (releaseDateMoment > currentTimestamp) {
        // Future releaseDate, upcoming project
        isUpcomingProject = true;
        isLaunchedRecently = false;
        // console.log(
        //   releaseDateMoment > currentTimestamp,
        //   releaseDate,
        //   projectCount,
        //   "@@@@",
        //   project._id
        // );
      } else if (releaseDateMoment <= currentTimestamp) {
        // Past releaseDate, recently launched project
        // console.log(releaseDate, projectCount, "@@@@", project._id);
        isUpcomingProject = false;
        isLaunchedRecently = true;
      }

      // Update the project's boolean values in the database
      const updatedProject = await Project.findOneAndUpdate(
        { _id: project._id },
        { $set: { isLaunchedRecently, isUpcomingProject, releaseDate } },
        {
          new: true,
          select: "_id",
        }
      );
      console.log("updatedProject", updatedProject);
    }

    // Log the success message or handle it as needed
    console.log(
      "Projects updated successfully via cron in automateStatusUpdateOfProjects:",
      projectCount,
      ranCount
    );
  } catch (error: any) {
    // Log and handle errors
    console.error(
      "Error in scheduled task of automateStatusUpdateOfProjects:",
      error.message
    );
    return NextResponse.json(
      {
        error: error.message || "Cron error in automateStatusUpdateOfProjects",
      },
      { status: error.statusCode || 500 }
    );
  }
};

// ====================This is the actual API to schedule the task that should hit only once
export function GET(request: Request) {
  // =======Scheduling automateClosingInOfProjects "At 02:00 on day-of-month 1"
  cron.schedule("0 0 2 1 * *", async () => {
    await automateClosingInOfProjects();
  });

  // ==================Scheduling automateStatusUpdateOfProjects “At 02:00. on every day”
  cron.schedule("0 0 2 * * *", async () => {
    await automateStatusUpdateOfProjects();
  });

  return new Response(`Task scheduled`);
}
