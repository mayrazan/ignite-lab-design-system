import { Meta, StoryObj } from '@storybook/react';
import { Signin } from './Signin';
import { within, userEvent, waitFor } from '@storybook/testing-library';
import { expect } from '@storybook/jest';
import { rest } from 'msw';

export default {
  title: 'Pages/Signin',
  component: Signin,
  args: {},
  parameters: {
    msw: {
      handlers: [
        rest.post('/sessions', (req, res, ctx) => {
          return res(
            ctx.json({
              message: 'Usuário logado com sucesso!',
            })
          );
        }),
      ],
    },
  },
} as Meta;

export const Default: StoryObj = {
  play: async ({ canvasElement }) => {
    const { getByPlaceholderText, getByRole, getByText } =
      within(canvasElement);

    userEvent.type(getByPlaceholderText('Digite seu e-mail'), 'email@test.com');
    userEvent.type(getByPlaceholderText('******'), '123456');

    userEvent.click(getByRole('button'));

    await waitFor(() => {
      return expect(
        getByText('Usuário logado com sucesso!')
      ).toBeInTheDocument();
    });
  },
};
