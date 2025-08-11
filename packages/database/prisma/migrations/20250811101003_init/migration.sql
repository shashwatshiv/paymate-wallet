-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "public"."User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");
