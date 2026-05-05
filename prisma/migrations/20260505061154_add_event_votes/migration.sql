-- CreateTable
CREATE TABLE "EventVote" (
    "id" SERIAL NOT NULL,
    "eventId" INTEGER NOT NULL,
    "userEmail" TEXT NOT NULL,
    "value" INTEGER NOT NULL,

    CONSTRAINT "EventVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EventVote_eventId_userEmail_key" ON "EventVote"("eventId", "userEmail");

-- AddForeignKey
ALTER TABLE "EventVote" ADD CONSTRAINT "EventVote_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
