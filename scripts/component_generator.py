import os
import pathlib
import re
import sys


NO_ARGS_ERROR_MESSAGE = """[Error] 出力先、コンポーネント名を指定してください。
ex) python3 -B component_generator.py views or components component-name
"""
NO_COMPONENT_NAME_ERROR_MESSAGE = """[Error] コンポーネント名を指定してください。
ex) python3 -B component_generator.py views or components component-name
"""
INVALID_OPTION_ERROR_MESSAGE = """[Error] 指定された出力先には出力できません。
'views' または 'components' を指定してください。
"""
SCRIPT_TEMPLATE = """import Vue from "vue";

export default Vue.extend({
});
"""
SINGLE_FILE_COMPONENT_TEMPLATE = """<template src="./template.html"></template>
<script src="./script.ts" lang="ts"></script>
<style src="./style.scss" lang="scss" scoped></style>
"""


def generate_directory(output_dest, component_name):
    module_dir = os.path.dirname(os.path.abspath(__file__))
    output_dir = os.path.join(
        pathlib.Path(module_dir).parent,
        'src',
        output_dest,
        component_name)
    try:
        os.makedirs(output_dir)
    except FileNotFoundError as e:
        sys.exit(e)
    return output_dir


def generate_file(output_dir, filename, text):
    filepath = os.path.join(output_dir, filename)
    with open(filepath, mode='w') as f:
        f.write(text)
        print('Created {0}'.format(filepath))


def to_camelcase(component_name):
    return re.sub(r'(?:^|-)(.)', lambda x: x.group(1).upper(), component_name)


if __name__ == '__main__':
    if len(sys.argv) < 2:
        sys.exit(NO_ARGS_ERROR_MESSAGE)
    if len(sys.argv) < 3:
        print(sys.exit(NO_COMPONENT_NAME_ERROR_MESSAGE))
    if not sys.argv[1] in ('views', 'components'):
        sys.exit(INVALID_OPTION_ERROR_MESSAGE)

    # create directory
    output_dir = generate_directory(sys.argv[1], sys.argv[2])

    # create files
    files = [
        {
            'name': '{0}.vue'.format(to_camelcase(sys.argv[2])),
            'text': SINGLE_FILE_COMPONENT_TEMPLATE
        },
        {
            'name': 'script.ts',
            'text': SCRIPT_TEMPLATE
        },
        {
            'name': 'style.scss',
            'text': ''
        },
        {
            'name': 'template.html',
            'text': ''
        },
    ]
    for f in files:
        generate_file(output_dir, f['name'], f['text'])
