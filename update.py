import os
import shutil
import logging

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

def remove_content_files(content_dir, exclude_file):
    """
    Remove all files and directories within the content directory, excluding the specified file.
    """
    for item in os.listdir(content_dir):
        item_path = os.path.join(content_dir, item)
        if item != exclude_file:
            try:
                if os.path.isfile(item_path):
                    os.remove(item_path)
                elif os.path.isdir(item_path):
                    shutil.rmtree(item_path)
                logging.info(f"Removed: {item_path}")
            except Exception as e:
                logging.error(f"Error removing {item_path}: {e}")

def copy_parent_dirs(parent_dirs, src_base_dir, dest_base_dir, ignore_patterns):
    """
    Copy specified directories from the source base directory to the destination base directory, 
    ignoring files matching the provided patterns.
    """
    for dir_name in parent_dirs:
        src_dir = os.path.join(src_base_dir, dir_name)
        dest_dir = os.path.join(dest_base_dir, dir_name)

        if os.path.exists(src_dir):
            try:
                shutil.copytree(src_dir, dest_dir, dirs_exist_ok=True, ignore=shutil.ignore_patterns(*ignore_patterns))
                logging.info(f"Copied directory: {src_dir} to {dest_dir}")
            except Exception as e:
                logging.error(f"Error copying directory {src_dir} to {dest_dir}: {e}")
        else:
            logging.warning(f"Source directory not found: {src_dir}")

def main():
    current_dir = os.path.dirname(os.path.abspath(__file__))
    parent_dir = os.path.abspath(os.path.join(current_dir, '..', '..'))
    content_dir = os.path.join(current_dir, 'content/posts')

    parent_dirs_to_copy = ['A-Articles', 'B-Photos', 'C-Audios', 'D-Videos', 'E-Share', 'F-Study', 'G-Work', 'H-Life']
    exclude_file = '_index.md'
    ignore_file_patterns = ['.git','.gitignore', '.DS_Store', '*.xlsx', '*.pdf'] 

    try:
        if not os.path.exists(content_dir):
            os.makedirs(content_dir)

        remove_content_files(content_dir, exclude_file)
        copy_parent_dirs(parent_dirs_to_copy, parent_dir, content_dir, ignore_file_patterns)

        logging.info("Operation completed!")
    except Exception as e:
        logging.error(f"An error occurred: {e}")

if __name__ == "__main__":
    main()
