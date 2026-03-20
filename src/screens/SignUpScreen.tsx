import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, ToastAndroid, View } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Input } from '../components/Input';
import { PrimaryButton } from '../components/PrimaryButton';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { useApp } from '../context/AppContext';
import {
  buildIntentionalUiError,
  intentionalErrorTriggers,
} from '../monitoring/handledUiErrors';

type AuthParamList = { SignIn: undefined; SignUp: undefined };
type Props = { navigation: NativeStackNavigationProp<AuthParamList, 'SignUp'> };

export function SignUpScreen({ navigation }: Props) {
  const { signIn } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignUp = () => {
    try {
      setError('');

      if (!name.trim()) {
        setError('Please enter your name');
        return;
      }

      if (!email.trim()) {
        setError('Please enter your email');
        return;
      }

      if (!password || password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }

      // Keep this trigger opt-in so QA can reproduce a handled sign-up error on demand.
      if (name.trim().toLowerCase() === intentionalErrorTriggers.signUpName) {
        throw buildIntentionalUiError('signUpName');
      }

      signIn(email.trim(), password);
      // RootNavigator switches to Main automatically via useApp().user
    } catch (error) {
      // Mirror the cart-screen style so handled sign-up errors produce direct
      // console traces during QA and monitoring validation.
      console.error(error);
      console.error('Sign-up handled error', error);
      console.error('Sign-up handled error stack', error instanceof Error ? error.stack : undefined);
      console.error('Sign-up handled error message', error instanceof Error ? error.message : String(error));
      setError('Sign-up validation failed. Please try again.');
      if (Platform.OS === 'android') {
        ToastAndroid.show('Sign-up validation failed. Please try again.', ToastAndroid.SHORT);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Create account</Text>
        <Text style={styles.subtitle}>Sign up to get started</Text>
        <Input
          label="Full name"
          value={name}
          onChangeText={setName}
          placeholder="John Doe"
          autoCapitalize="words"
        />
        <Input
          label="Email"
          value={email}
          onChangeText={setEmail}
          placeholder="you@example.com"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <Input
          label="Password"
          value={password}
          onChangeText={setPassword}
          placeholder="Min 6 characters"
          secureTextEntry
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <PrimaryButton title="Sign Up" onPress={handleSignUp} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <Text style={styles.link} onPress={() => navigation.navigate('SignIn')}>
            Sign In
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  scroll: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: spacing.xl,
  },
  error: {
    color: colors.error,
    fontSize: 14,
    marginBottom: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },
  footerText: { color: colors.textSecondary, fontSize: 14 },
  link: { color: colors.primary, fontSize: 14, fontWeight: '600' },
});
