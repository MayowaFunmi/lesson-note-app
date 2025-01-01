-- AddForeignKey
ALTER TABLE `lesson_periods` ADD CONSTRAINT `lesson_periods_lesson_note_id_fkey` FOREIGN KEY (`lesson_note_id`) REFERENCES `lesson_notes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
