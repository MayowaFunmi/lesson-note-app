-- AlterTable
ALTER TABLE `custom_fields` MODIFY `value` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `lesson_notes` MODIFY `topic` TEXT NOT NULL,
    MODIFY `sub_topic` TEXT NOT NULL,
    MODIFY `refernce_book` TEXT NOT NULL,
    MODIFY `instructional_aid` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `lesson_periods` MODIFY `sub_topic` TEXT NOT NULL,
    MODIFY `behavioural_objectives` TEXT NOT NULL,
    MODIFY `previous_knowledge` TEXT NOT NULL,
    MODIFY `contents` TEXT NOT NULL,
    MODIFY `evaluation` TEXT NOT NULL,
    MODIFY `conclusion` TEXT NOT NULL,
    MODIFY `assignment` TEXT NOT NULL;
