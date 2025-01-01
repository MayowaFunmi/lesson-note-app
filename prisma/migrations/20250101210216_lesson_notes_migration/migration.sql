-- CreateTable
CREATE TABLE `custom_fields` (
    `id` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `lesson_note_id` VARCHAR(191) NULL,
    `lesson_period_id` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lesson_periods` (
    `id` VARCHAR(191) NOT NULL,
    `lesson_note_id` VARCHAR(191) NOT NULL,
    `sub_topic` VARCHAR(191) NOT NULL,
    `behavioural_objectives` VARCHAR(191) NOT NULL,
    `previous_knowledge` VARCHAR(191) NOT NULL,
    `contents` VARCHAR(191) NOT NULL,
    `evaluation` VARCHAR(191) NOT NULL,
    `conclusion` VARCHAR(191) NOT NULL,
    `assignment` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lesson_notes` (
    `id` VARCHAR(191) NOT NULL,
    `teacher_id` VARCHAR(191) NOT NULL,
    `week_number` INTEGER NOT NULL,
    `start_date` DATETIME(3) NOT NULL,
    `end_date` DATETIME(3) NOT NULL,
    `subject_id` VARCHAR(191) NOT NULL,
    `class_id` VARCHAR(191) NOT NULL,
    `topic` VARCHAR(191) NOT NULL,
    `sub_topic` VARCHAR(191) NOT NULL,
    `refernce_book` VARCHAR(191) NOT NULL,
    `instructional_aid` VARCHAR(191) NOT NULL,
    `is_template` BOOLEAN NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `lesson_notes_teacher_id_key`(`teacher_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `custom_fields` ADD CONSTRAINT `custom_fields_lesson_note_id_fkey` FOREIGN KEY (`lesson_note_id`) REFERENCES `lesson_notes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `custom_fields` ADD CONSTRAINT `custom_fields_lesson_period_id_fkey` FOREIGN KEY (`lesson_period_id`) REFERENCES `lesson_periods`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lesson_notes` ADD CONSTRAINT `lesson_notes_teacher_id_fkey` FOREIGN KEY (`teacher_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
